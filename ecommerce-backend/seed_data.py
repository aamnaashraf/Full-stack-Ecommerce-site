from app.database import SessionLocal
from app.models.product import Product

def seed_products():
    """Seed database with initial product data"""
    db = SessionLocal()

    # Check if products already exist
    existing_products = db.query(Product).count()
    if existing_products > 0:
        print(f"Database already has {existing_products} products. Skipping seed.")
        db.close()
        return

    products_data = [
        # Home & Garden products (for Home and outdoor section)
        {
            "name": "Soft Lounge Chair",
            "description": "Comfortable soft chair for living room",
            "price": 349.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/1.jpg",
            "stock": 12,
        },
        {
            "name": "Modern Sofa Set",
            "description": "3-seater sofa with cushions",
            "price": 899.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/2.jpg",
            "stock": 8,
        },
        {
            "name": "Kitchen Dish Set",
            "description": "Complete ceramic dish set for 6 people",
            "price": 89.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/3.jpg",
            "stock": 25,
        },
        {
            "name": "Coffee Maker Machine",
            "description": "Automatic coffee maker with timer",
            "price": 129.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/4.jpg",
            "stock": 18,
        },
        {
            "name": "Smart Watch Pro",
            "description": "Fitness tracker with heart rate monitor",
            "price": 299.99,
            "category": "Home & Garden",
            "image": "/images/Image/tech/8.jpg",
            "stock": 30,
        },
        {
            "name": "Home Appliance Set",
            "description": "Multi-function kitchen appliance",
            "price": 199.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/5.jpg",
            "stock": 15,
        },
        {
            "name": "Power Blender",
            "description": "High-speed blender for smoothies",
            "price": 79.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/6.jpg",
            "stock": 22,
        },
        {
            "name": "Kitchen Mixer",
            "description": "Stand mixer with multiple attachments",
            "price": 249.99,
            "category": "Home & Garden",
            "image": "/images/Image/interior/7.jpg",
            "stock": 14,
        },
        # Electronics products
        {
            "name": "Canon EOS M50 Camera",
            "description": "Professional mirrorless camera with 4K video",
            "price": 649.99,
            "category": "Electronics",
            "image": "/images/Image/tech/6.jpg",
            "stock": 15,
        },
        {
            "name": "Wireless Headphones",
            "description": "Noise cancelling over-ear headphones",
            "price": 199.99,
            "category": "Electronics",
            "image": "/images/Image/tech/5.jpg",
            "stock": 30,
        },
        {
            "name": "Smartphone Pro Max",
            "description": "Latest flagship smartphone with 5G",
            "price": 999.99,
            "category": "Electronics",
            "image": "/images/Image/tech/2.jpg",
            "stock": 18,
        },
        {
            "name": "Portable Speaker",
            "description": "Bluetooth portable speaker with bass boost",
            "price": 49.99,
            "category": "Electronics",
            "image": "/images/Image/tech/4.jpg",
            "stock": 42,
        },
        {
            "name": "Smart TV 55 inch",
            "description": "4K Ultra HD Smart LED TV",
            "price": 799.99,
            "category": "Electronics",
            "image": "/images/Image/tech/1.png",
            "stock": 10,
        },
        {
            "name": "Wireless Earbuds",
            "description": "True wireless earbuds with charging case",
            "price": 149.99,
            "category": "Electronics",
            "image": "/images/Image/tech/3.jpg",
            "stock": 35,
        },
        {
            "name": "Gaming Console",
            "description": "Next-gen gaming console with controller",
            "price": 499.99,
            "category": "Electronics",
            "image": "/images/Image/tech/7.jpg",
            "stock": 12,
        },
        {
            "name": "Tablet Device",
            "description": "10-inch tablet with stylus support",
            "price": 399.99,
            "category": "Electronics",
            "image": "/images/Image/tech/9.jpg",
            "stock": 20,
        },
        # Additional products
        {
            "name": "Casual T-Shirt",
            "description": "Cotton t-shirt available in multiple colors",
            "price": 19.99,
            "category": "Clothes and wear",
            "image": "/images/Image/cloth/1.jpg",
            "stock": 100,
        },
        {
            "name": "Winter Jacket",
            "description": "Warm and stylish winter coat",
            "price": 89.99,
            "category": "Clothes and wear",
            "image": "/images/Image/cloth/3.jpg",
            "stock": 35,
        },
        {
            "name": "Leather Travel Bag",
            "description": "Durable leather bag for travel",
            "price": 129.99,
            "category": "Clothes and wear",
            "image": "/images/Image/cloth/5.jpg",
            "stock": 20,
        },
        {
            "name": "Laptop Computer",
            "description": "15-inch laptop with SSD storage",
            "price": 1299.99,
            "category": "Computer and tech",
            "image": "/images/Image/tech/10.jpg",
            "stock": 10,
        },
    ]

    for product_data in products_data:
        product = Product(**product_data)
        db.add(product)

    db.commit()
    print(f"Successfully seeded {len(products_data)} products!")
    db.close()

if __name__ == "__main__":
    seed_products()
