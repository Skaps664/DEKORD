"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCurrentUser } from '@/lib/services/auth'
import { getCartItems, addToCart as addToCartDB, updateCartItemQuantity, removeFromCart as removeFromCartDB, clearCart as clearCartDB } from '@/lib/services/cart'

export interface CartItem {
  id?: string // DB id for logged-in users
  productId?: string | null
  merchId?: string | null
  productName: string
  productImage: string
  variantId?: string | null
  variantDetails?: string // e.g., "1m, Black"
  length?: string
  color?: string
  price: number
  quantity: number
  itemType: 'product' | 'merch' // New field to distinguish item types
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  isLoading: boolean
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => Promise<void>
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => Promise<void>
  removeItem: (productId: string, variantId: string | null) => Promise<void>
  clearCart: () => Promise<void>
  syncCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'dekord_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [])

  // Check if user is logged in
  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: user } = await getCurrentUser()
    if (user) {
      setUserId(user.id)
      // Sync local cart to database if user just logged in
      if (items.length > 0 && !items[0].id) {
        await syncLocalCartToDB(user.id)
      }
    }
  }

  async function loadCart() {
    setIsLoading(true)
    try {
      const { data: user } = await getCurrentUser()
      
      if (user) {
        // Load from database
        const { data } = await getCartItems(user.id)
        if (data) {
          const cartItems: CartItem[] = data.map((item: any) => ({
            id: item.id,
            productId: item.product_id,
            merchId: item.merch_id,
            productName: item.product?.name || item.merch?.name || 'Item',
            productImage: item.product?.main_image || item.merch?.image || '',
            variantId: item.variant_id,
            variantDetails: item.variant && (item.variant.color || item.variant.length) 
              ? `${item.variant.color || ''} • ${item.variant.length || ''}`.replace(/^•\s*|\s*•$/g, '').trim()
              : undefined,
            length: item.variant?.length,
            color: item.variant?.color,
            price: item.variant?.price_override || item.product?.price || item.merch?.price || 0,
            quantity: item.quantity,
            itemType: item.product_id ? 'product' : 'merch'
          }))
          setItems(cartItems)
        }
      } else {
        // Load from localStorage
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
          const parsedItems = JSON.parse(stored)
          setItems(parsedItems)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function syncLocalCartToDB(uid: string) {
    try {
      for (const item of items) {
        await addToCartDB(
          uid, 
          item.productId || undefined, 
          item.merchId || undefined, 
          item.variantId || undefined, 
          item.quantity
        )
      }
      // Clear local storage after sync
      localStorage.removeItem(CART_STORAGE_KEY)
      // Reload from database
      await loadCart()
    } catch (error) {
      console.error('💥 Error syncing cart:', error)
    }
  }  async function addItem(item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) {
    const quantity = item.quantity || 1
    
    try {
      const { data: user } = await getCurrentUser()
      
      if (user) {
        // Add to database
        const { error } = await addToCartDB(
          user.id, 
          item.productId || undefined, 
          item.merchId || undefined, 
          item.variantId || undefined, 
          quantity
        )
        if (error) {
          console.error('Error adding to cart:', error)
          alert('Failed to add to cart')
          return
        }
        // Reload cart from database
        await loadCart()
      } else {
        // Add to localStorage
        setItems(prev => {
          const existingIndex = prev.findIndex(
            i => {
              if (item.itemType === 'merch') {
                return i.merchId === item.merchId
              } else {
                return i.productId === item.productId && i.variantId === item.variantId
              }
            }
          )
          
          let newItems
          if (existingIndex >= 0) {
            // Update quantity
            newItems = [...prev]
            newItems[existingIndex].quantity += quantity
          } else {
            // Add new item
            const newItem = { ...item, quantity }
            newItems = [...prev, newItem]
          }
          
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
          return newItems
        })
      }
    } catch (error) {
      console.error('💥 Error adding to cart:', error)
    }
  }

  async function updateQuantity(productId: string, variantId: string | null, quantity: number) {
    try {
      const { data: user } = await getCurrentUser()
      
      if (user) {
        // Find the cart item
        const item = items.find(i => {
          if (i.itemType === 'merch') {
            return i.merchId === productId // productId param is used for merchId in this context
          } else {
            return i.productId === productId && i.variantId === variantId
          }
        })
        if (item?.id) {
          const { error } = await updateCartItemQuantity(item.id, quantity)
          if (error) {
            console.error('Error updating quantity:', error)
            return
          }
          await loadCart()
        }
      } else {
        // Update in localStorage
        setItems(prev => {
          const newItems = prev.map(i => {
            if (i.itemType === 'merch') {
              return i.merchId === productId ? { ...i, quantity } : i
            } else {
              return i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
            }
          }).filter(i => i.quantity > 0)
          
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
          return newItems
        })
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  async function removeItem(productId: string, variantId: string | null) {
    try {
      const { data: user } = await getCurrentUser()
      
      if (user) {
        const item = items.find(i => {
          if (i.itemType === 'merch') {
            return i.merchId === productId // productId param is used for merchId in this context
          } else {
            return i.productId === productId && i.variantId === variantId
          }
        })
        if (item?.id) {
          const { error } = await removeFromCartDB(item.id)
          if (error) {
            console.error('Error removing item:', error)
            return
          }
          await loadCart()
        }
      } else {
        setItems(prev => {
          const newItems = prev.filter(i => {
            if (i.itemType === 'merch') {
              return i.merchId !== productId
            } else {
              return !(i.productId === productId && i.variantId === variantId)
            }
          })
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
          return newItems
        })
      }
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  async function clearCart() {
    try {
      const { data: user } = await getCurrentUser()
      
      if (user) {
        const { error } = await clearCartDB(user.id)
        if (error) {
          console.error('Error clearing cart:', error)
          return
        }
      } else {
        localStorage.removeItem(CART_STORAGE_KEY)
      }
      
      setItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  async function syncCart() {
    await loadCart()
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
