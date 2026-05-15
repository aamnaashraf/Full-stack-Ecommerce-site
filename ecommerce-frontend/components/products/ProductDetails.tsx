'use client';

import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      router.push(`/login?redirect=/products/${product._id || product.id}`);
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <Badge>{product.category}</Badge>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Stock: <span className="font-semibold">{product.stock} available</span>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-2 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} className="w-full" size="lg">
        Add to Cart
      </Button>
    </div>
  );
};
