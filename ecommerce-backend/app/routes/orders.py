from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse, OrderListResponse, OrderUpdate
from app.routes.auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["orders"])

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new order for the authenticated user"""

    # Validate that all products exist
    from app.models.product import Product
    product_ids = [item.product_id for item in order_data.items]
    existing_products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    existing_product_ids = {p.id for p in existing_products}

    missing_product_ids = [pid for pid in product_ids if pid not in existing_product_ids]
    if missing_product_ids:
        raise HTTPException(
            status_code=400,
            detail=f"Products with IDs {missing_product_ids} do not exist. Please refresh your cart."
        )

    # Calculate total amount from items
    total_amount = sum(item.price_at_purchase * item.quantity for item in order_data.items)

    # Create order
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        full_name=order_data.full_name,
        email=order_data.email,
        phone=order_data.phone,
        address=order_data.address,
        city=order_data.city,
        state=order_data.state,
        zip_code=order_data.zip_code,
        country=order_data.country,
        payment_method=order_data.payment_method,
        status="pending"
    )

    db.add(new_order)
    db.flush()  # Get the order ID

    # Create order items
    for item in order_data.items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.price_at_purchase
        )
        db.add(order_item)

    db.commit()
    db.refresh(new_order)

    return new_order

@router.get("/", response_model=List[OrderListResponse])
def get_user_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all orders for the authenticated user"""
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

    # Transform to include items count
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items_count": len(order.order_items)
        })

    return result

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific order by ID"""
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Check if order belongs to current user (or user is admin)
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to view this order")

    return order

@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update order status (admin only)"""

    # Check if user is admin
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update order status")

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order_update.status:
        order.status = order_update.status

    db.commit()
    db.refresh(order)

    return order

@router.delete("/{order_id}")
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel an order (only if status is pending)"""
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Check if order belongs to current user
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this order")

    # Only allow cancellation if order is pending
    if order.status != "pending":
        raise HTTPException(status_code=400, detail="Can only cancel pending orders")

    order.status = "cancelled"
    db.commit()

    return {"message": "Order cancelled successfully"}
