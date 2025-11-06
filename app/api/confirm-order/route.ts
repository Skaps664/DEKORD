import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const action = searchParams.get('action') || 'confirm'

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Update order confirmation status
    const { error } = await supabase
      .from('orders')
      .update({
        customer_confirmed: action === 'confirm',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Return HTML page
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .icon {
      font-size: 80px;
      text-align: center;
      margin-bottom: 20px;
      animation: bounce 0.5s ease;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    h1 {
      color: #1a1a1a;
      text-align: center;
      font-size: 28px;
      margin-bottom: 15px;
    }
    p {
      color: #666;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .buttons {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }
    .btn {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }
    .btn-confirm {
      background: #10b981;
      color: white;
    }
    .btn-confirm:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
    }
    .btn-query {
      background: #6366f1;
      color: white;
    }
    .btn-query:hover {
      background: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
    }
    .query-form {
      display: none;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .query-form.active {
      display: block;
    }
    textarea {
      width: 100%;
      padding: 15px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 15px;
      font-family: inherit;
      resize: vertical;
      min-height: 120px;
      margin-bottom: 15px;
      transition: border-color 0.3s ease;
    }
    textarea:focus {
      outline: none;
      border-color: #6366f1;
    }
    .btn-submit {
      width: 100%;
      padding: 15px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-submit:hover {
      background: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
    }
    .success {
      text-align: center;
      display: none;
    }
    .success.active {
      display: block;
    }
    .success-icon {
      font-size: 100px;
      margin-bottom: 20px;
      animation: bounce 0.5s ease;
    }
    .link {
      display: inline-block;
      margin-top: 20px;
      color: #6366f1;
      text-decoration: none;
      font-weight: 600;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="main-content">
      <div class="icon">📦</div>
      <h1>Confirm Your Order</h1>
      <p>Order ID: ${orderId.substring(0, 8)}...</p>
      
      <div class="buttons">
        <button class="btn btn-confirm" onclick="confirmOrder()">
          ✅ Confirm Order
        </button>
        <button class="btn btn-query" onclick="showQueryForm()">
          ❓ I have a question
        </button>
      </div>
      
      <div class="query-form" id="query-form">
        <p style="text-align: left; margin-bottom: 10px; color: #1a1a1a; font-weight: 600;">
          What's your question?
        </p>
        <textarea id="query-text" placeholder="Type your question or concern here..."></textarea>
        <button class="btn-submit" onclick="submitQuery()">
          Send Query
        </button>
      </div>
    </div>
    
    <div class="success" id="success-content">
      <div class="success-icon">🎉</div>
      <h1 id="success-title">Order Confirmed!</h1>
      <p id="success-message">Thank you for confirming. We'll process your order shortly and keep you updated.</p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}" class="link">Visit dekord.online</a>
    </div>
  </div>

  <script>
    const orderId = '${orderId}';
    
    function showQueryForm() {
      document.getElementById('query-form').classList.add('active');
      document.getElementById('query-text').focus();
    }
    
    async function confirmOrder() {
      try {
        const response = await fetch('/api/confirm-order?id=' + orderId + '&action=confirm', {
          method: 'GET'
        });
        
        showSuccess('Order Confirmed!', 'Thank you for confirming. We\\'ll process your order shortly and keep you updated.');
      } catch (error) {
        alert('Error confirming order. Please try again.');
      }
    }
    
    async function submitQuery() {
      const query = document.getElementById('query-text').value.trim();
      
      if (!query) {
        alert('Please enter your question');
        return;
      }
      
      try {
        const response = await fetch('/api/confirm-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, query })
        });
        
        if (response.ok) {
          showSuccess('Query Sent!', 'Thank you! Our team will review your question and get back to you soon.');
        } else {
          alert('Error sending query. Please try again.');
        }
      } catch (error) {
        alert('Error sending query. Please try again.');
      }
    }
    
    function showSuccess(title, message) {
      document.getElementById('main-content').style.display = 'none';
      document.getElementById('success-title').textContent = title;
      document.getElementById('success-message').textContent = message;
      document.getElementById('success-content').classList.add('active');
    }
  </script>
</body>
</html>`,
      {
        headers: { 'Content-Type': 'text/html' }
      }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { orderId, query } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Update order with customer query
    const { error } = await supabase
      .from('orders')
      .update({
        customer_confirmed: false,
        confirmation_query: query,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
