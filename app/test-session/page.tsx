"use client"

import { useEffect, useState } from "react"

export default function TestSessionPage() {
  const [sessionData, setSessionData] = useState<string | null>(null)
  const [allKeys, setAllKeys] = useState<string[]>([])

  useEffect(() => {
    // Get the appliedCoupon from sessionStorage
    const coupon = sessionStorage.getItem('appliedCoupon')
    setSessionData(coupon)

    // Get all sessionStorage keys
    const keys: string[] = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key) keys.push(key)
    }
    setAllKeys(keys)
  }, [])

  const handleSetTestCoupon = () => {
    const testCoupon = {
      code: "TEST123",
      discount_amount: 100,
      discount_type: "fixed_amount",
      discount_value: 100,
      coupon_id: "test-id"
    }
    sessionStorage.setItem('appliedCoupon', JSON.stringify(testCoupon))
    alert('Test coupon set! Check the data below.')
    window.location.reload()
  }

  const handleClearSession = () => {
    sessionStorage.removeItem('appliedCoupon')
    alert('Coupon cleared!')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">SessionStorage Debug Page</h1>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Applied Coupon Data</h2>
          {sessionData ? (
            <div>
              <p className="text-green-600 font-medium mb-2">✅ Coupon found in sessionStorage!</p>
              <pre className="bg-neutral-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(JSON.parse(sessionData), null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-red-600">❌ No coupon found in sessionStorage</p>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">All SessionStorage Keys</h2>
          {allKeys.length > 0 ? (
            <ul className="list-disc pl-5">
              {allKeys.map(key => (
                <li key={key} className="mb-2">
                  <span className="font-medium">{key}</span>
                  <pre className="bg-neutral-100 p-2 rounded mt-1 text-xs overflow-auto">
                    {sessionStorage.getItem(key)}
                  </pre>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-600">No keys in sessionStorage</p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSetTestCoupon}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Set Test Coupon
          </button>
          <button
            onClick={handleClearSession}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Clear Coupon
          </button>
        </div>

        <div className="mt-6 space-y-2">
          <a
            href="/cart"
            className="block w-full bg-neutral-800 text-white py-3 rounded-lg font-semibold text-center hover:bg-neutral-900"
          >
            Go to Cart
          </a>
          <a
            href="/checkout"
            className="block w-full bg-neutral-800 text-white py-3 rounded-lg font-semibold text-center hover:bg-neutral-900"
          >
            Go to Checkout
          </a>
        </div>
      </div>
    </div>
  )
}
