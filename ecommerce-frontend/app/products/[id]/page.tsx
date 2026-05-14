'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types/product';
import { api } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { SellerCard } from '@/components/products/SellerCard';
import { ProductTabs } from '@/components/products/ProductTabs';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { RecommendedProducts } from '@/components/products/RecommendedProducts';
import { Loading } from '@/components/ui/Loading';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try to fetch from API first
        const data = await api.getProduct(params.id as string);
        // Transform backend data to match frontend structure
        const transformedProduct = {
          ...data,
          _id: data.id.toString(),
          id: data.id.toString(),
        };
        setProduct(transformedProduct);

        // Fetch all products for related/recommended
        const allProducts = await api.getProducts();
        const transformedProducts = allProducts.map((p: any) => ({
          ...p,
          _id: p.id.toString(),
          id: p.id.toString(),
        }));

        // Get related products (same category, excluding current)
        const related = transformedProducts
          .filter((p: Product) => p.category === transformedProduct.category && p._id !== transformedProduct._id)
          .slice(0, 6);
        setRelatedProducts(related);

        // Get recommended products (different products, excluding current)
        const recommended = transformedProducts
          .filter((p: Product) => p._id !== transformedProduct._id)
          .slice(0, 5);
        setRecommendedProducts(recommended);

      } catch (error) {
        console.error('Failed to fetch product from API, using mock data:', error);
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p._id === params.id || p.id === params.id);
        if (mockProduct) {
          setProduct(mockProduct);

          // Use mock data for related/recommended as fallback
          const related = mockProducts
            .filter(p => p.category === mockProduct.category && p._id !== mockProduct._id)
            .slice(0, 6);
          setRelatedProducts(related);

          const recommended = mockProducts
            .filter(p => p._id !== mockProduct._id)
            .slice(0, 5);
          setRecommendedProducts(recommended);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <Loading />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="hidden sm:block bg-white border-b border-[#DEE2E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-[#8B96A5]">
            <a href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</a>
            {' / '}
            <a href="/products" className="hover:text-[#0D6EFD] transition-colors duration-300">{product.category}</a>
            {' / '}
            <span className="text-[#1C1C1C]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* 1. Product Gallery */}
          <ProductGallery
            images={[product.image]}
            productName={product.name}
          />

          {/* 2. Product Info (Name, Review, Price, Ratings) */}
          <ProductInfo product={product} />

          {/* 3. Product Details/Tabs */}
          <ProductTabs product={product} />

          {/* 4. Supplier Box */}
          <SellerCard />

          {/* 5. Similar Products Carousel */}
          <RecommendedProducts products={recommendedProducts} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Row 1: Gallery + Product Info + Supplier */}
          <div className="flex gap-5 mb-5 items-start">
            {/* Product Gallery */}
            <div className="w-[500px] flex-shrink-0">
              <ProductGallery
                images={[product.image]}
                productName={product.name}
              />
            </div>

            {/* Product Info (In Stock, Prices) */}
            <div className="flex-1">
              <ProductInfo product={product} />
            </div>

            {/* Supplier Box */}
            <div className="w-[280px] flex-shrink-0">
              <SellerCard />
            </div>
          </div>

          {/* Row 2: Description Tabs + You May Like */}
          <div className="flex gap-5 mb-5 items-start">
            {/* Description/Tabs Box */}
            <div className="flex-1">
              <ProductTabs product={product} />
            </div>

            {/* You May Like Box */}
            <aside className="w-[280px] flex-shrink-0">
              <RelatedProducts products={relatedProducts} />
            </aside>
          </div>

          {/* Row 3: Related Products - Full Width */}
          <RecommendedProducts products={recommendedProducts} />

          {/* Super Discount Banner */}
          <div className="bg-gradient-to-r from-[#2C7CF1] to-[#00D4FF] rounded-[6px] p-8 mt-5 flex items-center justify-between hover:shadow-xl transition-all duration-300 animate-fadeInUp">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Super discount on more than 100 USD</h3>
              <p className="text-white/90">Have you ever finally just write dummy info</p>
            </div>
            <button className="bg-[#FF9017] hover:bg-[#FF7A00] hover:scale-105 text-white px-6 py-3 rounded-[6px] font-semibold transition-all duration-300 shadow-lg">
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
