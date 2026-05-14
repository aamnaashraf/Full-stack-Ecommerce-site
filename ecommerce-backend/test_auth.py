"""
Test script for authentication and admin endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8001"

def test_auth_flow():
    print("=" * 50)
    print("Testing Authentication Flow")
    print("=" * 50)

    # Test 1: Admin Login
    print("\n1. Testing admin login...")
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": "admin@example.com", "password": "admin123"}
    )
    if response.status_code == 200:
        admin_data = response.json()
        admin_token = admin_data['access_token']
        print(f"[PASS] Admin login successful")
        print(f"  User: {admin_data['user']['full_name']}")
        print(f"  Role: {admin_data['user']['role']}")
    else:
        print(f"[FAIL] Admin login failed: {response.text}")
        return

    # Test 2: Regular User Login
    print("\n2. Testing regular user login...")
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": "user@example.com", "password": "user123"}
    )
    if response.status_code == 200:
        user_data = response.json()
        user_token = user_data['access_token']
        print(f"[PASS] User login successful")
        print(f"  User: {user_data['user']['full_name']}")
        print(f"  Role: {user_data['user']['role']}")
    else:
        print(f"[FAIL] User login failed: {response.text}")
        return

    # Test 3: Admin can create product
    print("\n3. Testing admin can create product...")
    response = requests.post(
        f"{BASE_URL}/api/products/",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "name": "Test Product by Admin",
            "description": "Created by admin for testing",
            "price": 499.99,
            "image": "/images/Image/tech/1.png",
            "category": "Electronics",
            "stock": 25
        }
    )
    if response.status_code == 201:
        product = response.json()
        print(f"[PASS] Admin created product successfully")
        print(f"  Product ID: {product['id']}")
        print(f"  Product Name: {product['name']}")
        product_id = product['id']
    else:
        print(f"[FAIL] Admin product creation failed: {response.text}")
        return

    # Test 4: Regular user cannot create product
    print("\n4. Testing regular user cannot create product...")
    response = requests.post(
        f"{BASE_URL}/api/products/",
        headers={"Authorization": f"Bearer {user_token}"},
        json={
            "name": "Test Product by User",
            "description": "Should fail",
            "price": 99.99,
            "image": "/test.jpg",
            "category": "Electronics",
            "stock": 10
        }
    )
    if response.status_code == 403:
        print(f"[PASS] Regular user correctly blocked from creating product")
        print(f"  Error: {response.json()['detail']}")
    else:
        print(f"[FAIL] Regular user was able to create product (should be blocked)")

    # Test 5: Admin can update product
    print("\n5. Testing admin can update product...")
    response = requests.put(
        f"{BASE_URL}/api/products/{product_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"price": 599.99, "stock": 30}
    )
    if response.status_code == 200:
        updated = response.json()
        print(f"[PASS] Admin updated product successfully")
        print(f"  New Price: ${updated['price']}")
        print(f"  New Stock: {updated['stock']}")
    else:
        print(f"[FAIL] Admin product update failed: {response.text}")

    # Test 6: Admin can delete product
    print("\n6. Testing admin can delete product...")
    response = requests.delete(
        f"{BASE_URL}/api/products/{product_id}",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    if response.status_code == 204:
        print(f"[PASS] Admin deleted product successfully")
    else:
        print(f"[FAIL] Admin product deletion failed: {response.text}")

    # Test 7: Unauthenticated user cannot create product
    print("\n7. Testing unauthenticated user cannot create product...")
    response = requests.post(
        f"{BASE_URL}/api/products/",
        json={
            "name": "Unauthorized Product",
            "description": "Should fail",
            "price": 99.99,
            "image": "/test.jpg",
            "category": "Electronics",
            "stock": 10
        }
    )
    if response.status_code == 401:
        print(f"[PASS] Unauthenticated user correctly blocked")
        print(f"  Error: {response.json()['detail']}")
    else:
        print(f"[FAIL] Unauthenticated user was able to create product")

    print("\n" + "=" * 50)
    print("All tests completed!")
    print("=" * 50)

if __name__ == "__main__":
    try:
        test_auth_flow()
    except Exception as e:
        print(f"\n[FAIL] Test failed with error: {e}")
