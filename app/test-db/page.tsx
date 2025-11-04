"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestDBPage() {
  const [status, setStatus] = useState<{
    connection: string
    tables: string[]
    error: string | null
  }>({
    connection: 'Testing...',
    tables: [],
    error: null
  })

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        
        // Test connection
        const { data: healthCheck, error: healthError } = await supabase
          .from('products')
          .select('count')
          .limit(1)

        if (healthError) {
          setStatus({
            connection: 'Failed',
            tables: [],
            error: healthError.message
          })
          return
        }

        // Test if tables exist by querying orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .limit(1)

        if (ordersError) {
          setStatus({
            connection: 'Connected but tables missing',
            tables: [],
            error: ordersError.message
          })
          return
        }

        setStatus({
          connection: 'Connected!',
          tables: ['products', 'collections', 'orders', 'user_profiles', 'cart_items'],
          error: null
        })

      } catch (error: any) {
        setStatus({
          connection: 'Error',
          tables: [],
          error: error.message
        })
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 pt-28">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
            <p className={`text-lg ${
              status.connection === 'Connected!' ? 'text-green-600' : 
              status.connection === 'Failed' ? 'text-red-600' : 
              'text-yellow-600'
            }`}>
              {status.connection}
            </p>
          </div>

          {status.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
              <p className="text-red-700">{status.error}</p>
              
              {status.error.includes('relation') && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ This error means the database tables don't exist yet!</strong>
                    <br /><br />
                    You need to run the SQL schema first:
                    <ol className="list-decimal ml-4 mt-2 space-y-1">
                      <li>Go to your Supabase dashboard</li>
                      <li>Navigate to SQL Editor</li>
                      <li>Copy the contents of <code className="bg-yellow-100 px-1 rounded">/supabase-schema.sql</code></li>
                      <li>Paste and run it</li>
                    </ol>
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
            <div className="space-y-2 text-sm font-mono bg-gray-50 p-3 rounded">
              <div>
                <span className="text-gray-600">SUPABASE_URL:</span>{' '}
                <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">SUPABASE_ANON_KEY:</span>{' '}
                <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <a 
                href="https://supabase.com/dashboard/project/awkcvltduqojgdgdjhca/editor" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition text-center"
              >
                Open Supabase SQL Editor
              </a>
              <a 
                href="https://supabase.com/dashboard/project/awkcvltduqojgdgdjhca/editor" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center"
              >
                Open Supabase Table Editor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
