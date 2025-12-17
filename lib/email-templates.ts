interface OrderEmailData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  items: Array<{ 
    product_name: string
    variant_details?: string
    quantity: number
    unit_price: number
  }>
  trackingNumber?: string
  trackingUrl?: string
  courier?: string
}

const emailStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #1a1a1a;
    background: #f5f5f5;
    -webkit-font-smoothing: antialiased;
  }
  .email-wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
  }
  .header {
    background: #ffffff;
    padding: 30px 30px 20px;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }
  .logo {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    letter-spacing: 3px;
    margin-bottom: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    text-transform: lowercase;
  }
  .tagline {
    color: #666666;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .hero {
    padding: 50px 30px;
    text-align: center;
    background: #ffffff;
  }
  .hero-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
  .confirm-hero-button {
    display: inline-block;
    background: linear-gradient(135deg, #fbff00ff 0%, #fbff00ff 100%);
    color: #171717ff !important;
    padding: 20px 50px;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 18px;
    margin: 0 auto 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  }
  .confirm-hero-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }
  .hero-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .hero-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
  }
  .content {
    padding: 0 30px 40px;
    background: #ffffff;
  }
  .greeting {
    font-size: 16px;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  .message {
    font-size: 15px;
    color: #444;
    line-height: 1.7;
    margin-bottom: 16px;
  }
  .order-box {
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    margin: 30px 0;
  }
  .order-header {
    font-size: 14px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  .order-number {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  .item:last-child {
    border-bottom: none;
  }
  .item-details {
    flex: 1;
  }
  .item-name {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 15px;
    margin-bottom: 4px;
  }
  .item-variant {
    font-size: 13px;
    color: #666;
  }
  .item-price {
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
    margin-left: 16px;
  }
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 2px solid #1a1a1a;
  }
  .total-label {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
  }
  .total-amount {
    font-size: 22px;
    font-weight: 800;
    color: #1a1a1a;
  }
  .cta-button {
    display: inline-block;
    background: #1a1a1a;
    color: #ffffff !important;
    padding: 16px 40px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0;
    transition: background 0.3s ease;
  }
  .cta-button:hover {
    background: #000000;
  }
  .highlight-box {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 16px 20px;
    border-radius: 8px;
    margin: 20px 0;
  }
  .highlight-text {
    font-size: 14px;
    color: #92400e;
    font-weight: 500;
  }
  .info-box {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }
  .info-title {
    font-size: 15px;
    font-weight: 700;
    color: #0c4a6e;
    margin-bottom: 8px;
  }
  .info-text {
    font-size: 14px;
    color: #075985;
    line-height: 1.6;
  }
  .tracking-box {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    margin: 24px 0;
    text-align: center;
  }
  .tracking-label {
    font-size: 13px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
  .tracking-value {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
  }
  .footer {
    background: #f9fafb;
    padding: 30px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }
  .footer-links {
    margin-bottom: 16px;
  }
  .footer-link {
    color: #1a1a1a;
    text-decoration: none;
    font-size: 13px;
    margin: 0 12px;
    font-weight: 500;
  }
  .footer-text {
    font-size: 12px;
    color: #666;
    line-height: 1.6;
  }
  .social-links {
    margin: 20px 0;
  }
  .social-link {
    display: inline-block;
    margin: 0 8px;
    color: #666;
    text-decoration: none;
    font-size: 13px;
  }
  @media only screen and (max-width: 600px) {
    .hero {
      padding: 40px 20px;
    }
    .hero-title {
      font-size: 24px;
    }
    .content {
      padding: 0 20px 30px;
    }
    .order-box {
      padding: 20px;
    }
    .order-number {
      font-size: 20px;
    }
    .item {
      flex-direction: column;
      gap: 8px;
    }
    .item-price {
      margin-left: 0;
    }
    .cta-button {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
`

export function getOrderPlacedEmail(data: OrderEmailData, confirmUrl: string) {
  return {
    subject: `✓ Confirm Your Order #${data.orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Order</title>
  <style>${emailStyles}</style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">dekord</div>
      <div class="tagline">Defy Ordinary</div>
    </div>

    <!-- Hero Section -->
    <div class="hero">
      <h1 class="hero-title">Order Received!</h1>
      <p class="hero-subtitle">Please confirm to proceed</p>
      <a href="${confirmUrl}" class="confirm-hero-button">
        Click to Confirm Your Order
      </a>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="greeting">Hi ${data.customerName},</p>
      
      <p class="message">
        Thanks for choosing dekord! We've received your order and need your quick confirmation to start processing.
      </p>

      <!-- Order Details -->
      <div class="order-box">
        <div class="order-header">Order Details</div>
        <div class="order-number">#${data.orderNumber}</div>
        
        ${data.items.map(item => `
          <div class="item">
            <div class="item-details">
              <div class="item-name">${item.product_name} × ${item.quantity}</div>
              ${item.variant_details ? `<div class="item-variant">${item.variant_details}</div>` : ''}
            </div>
            <div class="item-price">Rs. ${Number(item.unit_price * item.quantity).toLocaleString()}</div>
          </div>
        `).join('')}
        
        <div class="total-row">
          <div class="total-label">Total</div>
          <div class="total-amount">Rs. ${Number(data.total).toLocaleString()}</div>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center;">
        <a href="${confirmUrl}" class="cta-button">
          CONFIRM MY ORDER
        </a>
      </div>

      <!-- Highlight Box -->
      <div class="highlight-box">
        <p class="highlight-text">
          ⚡ Quick confirmation helps us process and ship your order faster!
        </p>
      </div>

      <p class="message">
        Once confirmed, we'll prepare your order with care and ship it within 1 business day.
      </p>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-title">What's Next?</div>
        <p class="info-text">
          1. Confirm your order<br>
          2. We'll process & pack it carefully<br>
          3. Get tracking info via email & WhatsApp<br>
          4. Receive in 3-5 business days
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-links">
        <a href="https://dekord.online/warranty-policy" class="footer-link">Warranty</a>
        <a href="https://dekord.online/return-policy" class="footer-link">Returns</a>
        <a href="https://dekord.online/contact" class="footer-link">Support</a>
      </div>
      <div class="social-links">
        <a href="https://instagram.com/dekord.pk" class="social-link">Instagram</a>
        <a href="https://facebook.com/dekord.pk" class="social-link">Facebook</a>
      </div>
      <p class="footer-text">
        team@dekord.online | +92 339 0166442
      </p>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function getOrderProcessingEmail(data: OrderEmailData, baseUrl: string) {
  return {
    subject: `📦 Processing Order #${data.orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Processing</title>
  <style>${emailStyles}</style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="logo">dekord</div>
      <div class="tagline">Defy Ordinary</div>
    </div>

    <div class="hero">
      <div class="hero-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">📦</div>
      <h1 class="hero-title">We're On It!</h1>
      <p class="hero-subtitle">Your order is being prepared</p>
    </div>

    <div class="content">
      <p class="greeting">Hi ${data.customerName},</p>
      
      <p class="message">
        Great news! Your order is confirmed and we're carefully preparing it for shipment.
      </p>

      <div class="order-box">
        <div class="order-header">Order Number</div>
        <div class="order-number">#${data.orderNumber}</div>
        <p style="font-size: 15px; color: #4CAF50; font-weight: 600; margin-top: 12px;">✓ Confirmed & Processing</p>
      </div>

      <div class="info-box">
        <div class="info-title">Current Status</div>
        <p class="info-text">
          Your order is being quality-checked and packed securely. You'll receive tracking details once it ships!
        </p>
      </div>

      <div style="text-align: center;">
        <a href="${baseUrl}/account/orders" class="cta-button">
          VIEW ORDER STATUS
        </a>
      </div>

      <p class="message" style="text-align: center; color: #666; font-size: 14px;">
        Expected delivery: 3-5 business days from shipment
      </p>
    </div>

    <div class="footer">
      <div class="footer-links">
        <a href="https://dekord.online/warranty-policy" class="footer-link">Warranty</a>
        <a href="https://dekord.online/return-policy" class="footer-link">Returns</a>
        <a href="https://dekord.online/contact" class="footer-link">Support</a>
      </div>
      <div class="social-links">
        <a href="https://instagram.com/dekord.pk" class="social-link">Instagram</a>
        <a href="https://facebook.com/dekord.pk" class="social-link">Facebook</a>
      </div>
      <p class="footer-text">
        team@dekord.online | +92 339 0166442
      </p>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function getOrderShippedEmail(data: OrderEmailData) {
  return {
    subject: `🚚 On the Way! Order #${data.orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
  <style>${emailStyles}</style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="logo">dekord</div>
      <div class="tagline">Defy Ordinary</div>
    </div>

    <div class="hero">
      <div class="hero-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);">🚚</div>
      <h1 class="hero-title">Shipped!</h1>
      <p class="hero-subtitle">Your order is on the way</p>
    </div>

    <div class="content">
      <p class="greeting">Hi ${data.customerName},</p>
      
      <p class="message">
        Exciting news! Your order has shipped and is heading your way.
      </p>

      <div class="tracking-box">
        <div class="order-header">Order Number</div>
        <div class="order-number">#${data.orderNumber}</div>
        
        ${data.courier ? `
          <div style="margin-top: 20px;">
            <div class="tracking-label">Courier</div>
            <div class="tracking-value">${data.courier}</div>
          </div>
        ` : ''}
        
        ${data.trackingNumber ? `
          <div style="margin-top: 16px;">
            <div class="tracking-label">Tracking Number</div>
            <div class="tracking-value">${data.trackingNumber}</div>
          </div>
        ` : ''}
        
        ${data.trackingUrl ? `
          <div style="margin-top: 24px;">
            <a href="${data.trackingUrl}" class="cta-button">
              TRACK SHIPMENT
            </a>
          </div>
        ` : ''}
      </div>

      <div class="highlight-box">
        <p class="highlight-text">
          💰 Please have your payment ready when the courier arrives!
        </p>
      </div>

      <div class="info-box">
        <div class="info-title">Delivery Timeline</div>
        <p class="info-text">
          Expected delivery: 3-5 business days<br>
          Courier will contact you before delivery
        </p>
      </div>

      <p class="message">
        Track your shipment and stay updated on delivery status.
      </p>
    </div>

    <div class="footer">
      <div class="footer-links">
        <a href="https://dekord.online/warranty-policy" class="footer-link">Warranty</a>
        <a href="https://dekord.online/return-policy" class="footer-link">Returns</a>
        <a href="https://dekord.online/contact" class="footer-link">Support</a>
      </div>
      <div class="social-links">
        <a href="https://instagram.com/dekord.pk" class="social-link">Instagram</a>
        <a href="https://facebook.com/dekord.pk" class="social-link">Facebook</a>
      </div>
      <p class="footer-text">
        team@dekord.online | +92 339 0166442
      </p>
    </div>
  </div>
</body>
</html>
    `
  }
}

export function getOrderDeliveredEmail(data: OrderEmailData, baseUrl: string) {
  return {
    subject: `🎉 Delivered! Enjoy Your Order #${data.orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Delivered</title>
  <style>${emailStyles}</style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="logo">dekord</div>
      <div class="tagline">Defy Ordinary</div>
    </div>

    <div class="hero">
      <div class="hero-icon" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">🎉</div>
      <h1 class="hero-title">Delivered!</h1>
      <p class="hero-subtitle">Thanks for choosing dekord</p>
    </div>

    <div class="content">
      <p class="greeting">Hi ${data.customerName},</p>
      
      <p class="message" style="font-size: 17px; font-weight: 600; color: #1a1a1a;">
        Your order #${data.orderNumber} has been delivered successfully! 🎊
      </p>

      <p class="message">
        We hope you love your new premium charging cables. At dekord, we believe in quality that lasts.
      </p>

      <div class="info-box" style="background: #f0fdf4; border-color: #bbf7d0;">
        <div class="info-title" style="color: #166534;">Your Product is Protected</div>
        <p class="info-text" style="color: #15803d;">
          ✓ 1-Year Warranty Coverage<br>
          ✓ 30-Day Return Window<br>
          ✓ Hassle-Free Support
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${baseUrl}/account/orders?review=${data.orderId}" class="cta-button" style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);">
          SHARE YOUR EXPERIENCE
        </a>
      </div>

      <p class="message" style="text-align: center; font-size: 14px;">
        Your review helps us improve and helps others make better choices!
      </p>

      <div class="highlight-box" style="background: #fef3c7; border-color: #fbbf24;">
        <p class="highlight-text">
          💬 Need help? Our support team is here for you. Visit our <a href="https://dekord.online/claim" style="color: #92400e; font-weight: 700;">Claim Page</a> for any issues.
        </p>
      </div>
    </div>

    <div class="footer">
      <div class="footer-links">
        <a href="https://dekord.online/warranty-policy" class="footer-link">Warranty</a>
        <a href="https://dekord.online/return-policy" class="footer-link">Returns</a>
        <a href="https://dekord.online/claim" class="footer-link">Submit Claim</a>
      </div>
      <div class="social-links">
        <a href="https://instagram.com/dekord.pk" class="social-link">Instagram</a>
        <a href="https://facebook.com/dekord.pk" class="social-link">Facebook</a>
      </div>
      <p class="footer-text">
        team@dekord.online | +92 339 0166442
      </p>
    </div>
  </div>
</body>
</html>
    `
  }
}
