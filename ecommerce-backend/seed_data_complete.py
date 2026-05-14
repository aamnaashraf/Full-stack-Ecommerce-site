from app.database import SessionLocal
from app.models.product import Product

def seed_products():
    """Seed database with all 27 products (tech: 10, interior: 10, cloth: 7)"""
    db = SessionLocal()

    # Clear existing products
    db.query(Product).delete()
    db.commit()
    print("Cleared existing products")

    products_data = [
        # ELECTRONICS (10 products - tech folder)
        {
            "name": "Smart TV 55 inch",
            "description": "4K Ultra HD Smart LED TV with HDR",
            "price": 799.99,
            "original_price": 999.99,
            "category": "Electronics",
            "image": "/images/Image/tech/1.png",
            "stock": 10,
        },
        {
            "name": "Smartphone Pro Max",
            "description": "Latest flagship smartphone with 5G and triple camera",
            "price": 999.99,
            "original_price": 1199.99,
            "category": "Electronics",
            "image": "/images/Image/tech/2.jpg",
            "stock": 18,
        },
        {
            "name": "Wireless Earbuds",
            "description": "True wireless earbuds with active noise cancellation",
            "price": 149.99,
            "original_price": 199.99,
            "category": "Electronics",
            "image": "/images/Image/tech/3.jpg",
            "stock": 35,
        },
        {
            "name": "Portable Bluetooth Speaker",
            "description": "Waterproof portable speaker with 360° sound",
            "price": 49.99,
            "original_price": 79.99,
            "category": "Electronics",
            "image": "/images/Image/tech/4.jpg",
            "stock": 42,
        },
        {
            "name": "Wireless Headphones",
            "description": "Over-ear noise cancelling wireless headphones",
            "price": 199.99,
            "original_price": 249.99,
            "category": "Electronics",
            "image": "/images/Image/tech/5.jpg",
            "stock": 30,
        },
        {
            "name": "Canon EOS M50 Camera",
            "description": "Professional mirrorless camera with 4K video recording",
            "price": 649.99,
            "original_price": 799.99,
            "category": "Electronics",
            "image": "/images/Image/tech/6.jpg",
            "stock": 15,
        },
        {
            "name": "Gaming Laptop",
            "description": "High-performance gaming laptop with RTX graphics",
            "price": 1499.99,
            "original_price": 1799.99,
            "category": "Electronics",
            "image": "/images/Image/tech/7.jpg",
            "stock": 12,
        },
        {
            "name": "Smart Watch Pro",
            "description": "Fitness tracker with heart rate monitor and GPS",
            "price": 299.99,
            "original_price": 399.99,
            "category": "Electronics",
            "image": "/images/Image/tech/8.jpg",
            "stock": 30,
        },
        {
            "name": "Tablet 10 inch",
            "description": "Android tablet with stylus support and keyboard",
            "price": 399.99,
            "original_price": 499.99,
            "category": "Electronics",
            "image": "/images/Image/tech/9.jpg",
            "stock": 20,
        },
        {
            "name": "Electric Kettle",
            "description": "Stainless steel electric kettle with auto shut-off",
            "price": 39.99,
            "original_price": 59.99,
            "category": "Electronics",
            "image": "/images/Image/tech/10.jpg",
            "stock": 55,
        },

        # HOME & GARDEN (10 products - interior folder)
        {
            "name": "Soft Lounge Chair",
            "description": "Comfortable modern lounge chair for living room",
            "price": 349.99,
            "original_price": 449.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/1.jpg",
            "stock": 12,
        },
        {
            "name": "Wooden Bookshelf",
            "description": "5-tier wooden bookshelf with modern design",
            "price": 179.99,
            "original_price": 229.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/2.jpg",
            "stock": 14,
        },
        {
            "name": "Decorative Plant Pot Set",
            "description": "Set of 3 ceramic plant pots with saucers",
            "price": 29.99,
            "original_price": 44.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/3.jpg",
            "stock": 50,
        },
        {
            "name": "Modern Wall Clock",
            "description": "Minimalist wall clock with silent movement",
            "price": 34.99,
            "original_price": 49.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/4.jpg",
            "stock": 38,
        },
        {
            "name": "Premium Mattress Queen",
            "description": "Memory foam queen size mattress with cooling gel",
            "price": 799.99,
            "original_price": 999.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/5.jpg",
            "stock": 12,
        },
        {
            "name": "Modern Table Lamp",
            "description": "LED desk lamp with adjustable brightness and color",
            "price": 59.99,
            "original_price": 79.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/6.jpg",
            "stock": 40,
        },
        {
            "name": "Dining Table Set",
            "description": "4-seater wooden dining table with cushioned chairs",
            "price": 549.99,
            "original_price": 699.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/7.jpg",
            "stock": 6,
        },
        {
            "name": "Living Room Carpet",
            "description": "Soft shaggy carpet rug for living room 6x9 ft",
            "price": 79.99,
            "original_price": 119.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/8.jpg",
            "stock": 25,
        },
        {
            "name": "Blackout Curtain Set",
            "description": "Thermal insulated blackout curtains for bedroom",
            "price": 44.99,
            "original_price": 64.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/9.jpg",
            "stock": 32,
        },
        {
            "name": "Kitchen Appliance Set",
            "description": "Multi-function kitchen appliance with mixer and blender",
            "price": 149.99,
            "original_price": 199.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/10.jpg",
            "stock": 22,
        },

        # CLOTHING (7 products - cloth folder)
        {
            "name": "Casual Cotton T-Shirt",
            "description": "Premium cotton t-shirt available in multiple colors",
            "price": 19.99,
            "original_price": 29.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/1.jpg",
            "stock": 100,
        },
        {
            "name": "Classic Denim Jeans",
            "description": "Comfortable slim-fit blue denim jeans",
            "price": 54.99,
            "original_price": 74.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/2.jpg",
            "stock": 48,
        },
        {
            "name": "Winter Puffer Jacket",
            "description": "Warm insulated winter jacket with hood",
            "price": 89.99,
            "original_price": 129.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/3.jpg",
            "stock": 35,
        },
        {
            "name": "Comfortable Shorts",
            "description": "Breathable summer shorts for men",
            "price": 34.99,
            "original_price": 49.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/4.jpg",
            "stock": 60,
        },
        {
            "name": "Leather Travel Bag",
            "description": "Genuine leather duffle bag for travel",
            "price": 129.99,
            "original_price": 179.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/5.jpg",
            "stock": 20,
        },
        {
            "name": "Premium Leather Wallet",
            "description": "Handcrafted brown leather bifold wallet",
            "price": 45.99,
            "original_price": 64.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/6.jpg",
            "stock": 45,
        },
        {
            "name": "Running Sports Shoes",
            "description": "Lightweight running shoes with cushioned sole",
            "price": 79.99,
            "original_price": 109.99,
            "category": "Clothing",
            "image": "/images/Image/cloth/7.jpg",
            "stock": 36,
        },
    ]

    for product_data in products_data:
        product = Product(**product_data)
        db.add(product)

    db.commit()
    print(f"Successfully seeded {len(products_data)} products!")

    # Verify
    count = db.query(Product).count()
    print(f"Total products in database: {count}")

    db.close()

if __name__ == "__main__":
    seed_products()
