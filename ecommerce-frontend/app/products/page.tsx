'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import { api } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { ProductsHeader } from '@/components/products/ProductsHeader';
import { CategoryChips } from '@/components/layout/CategoryChips';
import { Loading } from '@/components/ui/Loading';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Transform backend data to match frontend structure
        const transformedData = data.map((p: any) => ({
          ...p,
          _id: p.id.toString(),
          id: p.id.toString(),
        }));
        setProducts(transformedData);
        setFilteredProducts(transformedData);

        const uniqueCategories = Array.from(new Set(transformedData.map((p: Product) => p.category))) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch products from API, using mock data:', error);
        // Fallback to mock data if API fails
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        const uniqueCategories = Array.from(new Set(mockProducts.map((p: Product) => p.category)));
        setCategories(uniqueCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filtered = products;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
      setSelectedCategory(category);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply price filter
    filtered = filtered.filter((p) => p.price >= priceFilter.min && p.price <= priceFilter.max);

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchParams, products, sortBy, priceFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
    if (category) {
      setFilteredProducts(products.filter((p) => p.category === category));
    } else {
      setFilteredProducts(products);
    }
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceFilter({ min, max });
    setCurrentPage(1); // Reset to page 1 when price filter changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

  return (
    <>
      <CategoryChips />
      <div className="bg-[#F7FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Filter and Sort Row */}
        <div className="lg:hidden flex gap-2 mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex-1 px-4 py-3 bg-white border border-[#DEE2E7] rounded-[6px] flex items-center justify-center gap-2 text-[#1C1C1C] font-medium hover:bg-[#F7FAFC] hover:border-[#0D6EFD] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#0D6EFD]">
              <path d="M2.5 5.83333H17.5M5.83333 10H14.1667M8.33333 14.1667H11.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filters
          </button>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 border border-[#DEE2E7] rounded-[6px] px-3 py-3 text-[13px] font-normal text-[#1C1C1C] bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] hover:border-[#0D6EFD] transition-all duration-300 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-full lg:w-[280px] flex-shrink-0">
            <ProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </aside>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-xl overflow-y-auto animate-slideInLeft">
                <div className="p-4 border-b border-[#DEE2E7] flex items-center justify-between sticky top-0 bg-white z-10">
                  <h2 className="text-lg font-semibold text-[#1C1C1C]">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category) => {
                      handleCategoryChange(category);
                      setShowMobileFilters(false);
                    }}
                    onPriceRangeChange={(min, max) => {
                      handlePriceRangeChange(min, max);
                      setShowMobileFilters(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 w-full lg:max-w-[920px]">
            <ProductsHeader
              totalItems={filteredProducts.length}
              category={selectedCategory || 'Mobile accessory'}
              onSortChange={setSortBy}
            />
            <ProductGrid products={currentProducts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8 mb-4 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-md font-medium transition-all duration-300 ${
                      currentPage === pageNumber
                        ? 'bg-[#0D6EFD] text-white shadow-lg scale-105'
                        : 'bg-white text-[#1C1C1C] border border-[#DEE2E7] hover:bg-gray-50 hover:shadow-md hover:scale-105'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}
