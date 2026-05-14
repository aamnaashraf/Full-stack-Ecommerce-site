# How to Verify Data is Coming from Backend

## Method 1: Browser DevTools Network Tab ✅

1. Open your browser at: http://localhost:3000/products
2. Press **F12** to open DevTools
3. Click on the **Network** tab
4. Refresh the page (F5)
5. Look for a request to: `http://localhost:8001/api/products/`

**What you should see:**
- Request URL: `http://localhost:8001/api/products/`
- Status: 200 OK
- Response: JSON with 27 products

**If you see this request, data is coming from backend!**

---

## Method 2: Check for Backend-Only Fields 🔍

Backend data has fields that mock data doesn't have:
- `created_at` - timestamp when product was created
- `updated_at` - timestamp when product was updated

**How to check:**
1. Open browser console (F12 → Console tab)
2. Go to: http://localhost:3000/products
3. Type in console:
```javascript
// This will show you the first product's data
console.log(document.querySelector('[data-product-id]'))
```

Or inspect the Network response and look for `created_at` field.

---

## Method 3: Add a Test Product to Backend 🧪

Let's add a unique product that doesn't exist in mock data:

```bash
curl -X POST http://localhost:8001/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TEST BACKEND PRODUCT - DELETE ME",
    "description": "This proves data is from backend",
    "price": 999.99,
    "image": "/test.jpg",
    "category": "Test",
    "stock": 1
  }'
```

Then refresh http://localhost:3000/products

**If you see "TEST BACKEND PRODUCT", it's definitely from backend!**

---

## Quick Verification Command

Run this to see what backend returns vs mock data:
