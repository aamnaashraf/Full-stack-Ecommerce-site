# How to Check if Frontend is Using Backend Data

## Step-by-Step Verification

### 1. Open Browser DevTools
- Go to: http://localhost:3000/products
- Press **F12** (or right-click → Inspect)
- Click on the **Network** tab

### 2. Refresh the Page
- Press **F5** to refresh
- Watch the Network tab

### 3. Look for This Request
You should see a request to:
```
http://localhost:8001/api/products/
```

**If you see this:**
- ✅ Data is coming from BACKEND
- Status should be: 200 OK
- Click on it to see the response

**If you DON'T see this:**
- ❌ Data is coming from MOCK DATA (fallback)
- Check if backend is still running
- Check browser console for errors

### 4. Check the Response
Click on the request and look at the **Response** tab.

**Backend data has these fields:**
```json
{
  "id": 1,
  "name": "Canon EOS M50 Camera",
  "created_at": "2026-04-29T15:51:41.191629Z",  ← ONLY IN BACKEND
  "updated_at": null                             ← ONLY IN BACKEND
}
```

**Mock data does NOT have:**
- `created_at` field
- `updated_at` field

---

## Alternative: Create Test Product (Don't Delete This Time)

Run this command to add a unique product:

```bash
curl -X POST http://localhost:8001/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PROOF THIS IS BACKEND DATA",
    "description": "This product only exists in backend",
    "price": 1.00,
    "image": "/images/Image/tech/1.png",
    "category": "Backend Test",
    "stock": 1
  }'
```

Then refresh http://localhost:3000/products

If you see "PROOF THIS IS BACKEND DATA" → It's definitely backend!

---

## What to Look For

**Backend Data Signs:**
- Network request to localhost:8001
- `created_at` and `updated_at` fields
- Test product appears after adding it

**Mock Data Signs:**
- No network request to localhost:8001
- No `created_at` field
- Test product doesn't appear
- Console error about API connection
