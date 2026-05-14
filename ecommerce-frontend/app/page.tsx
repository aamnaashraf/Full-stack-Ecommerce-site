import { Hero } from '@/components/home/Hero';
import { DealsSection } from '@/components/home/DealsSection';
import { CategorySection } from '@/components/home/CategorySection';
import { QuoteSection } from '@/components/home/QuoteSection';
import { RecommendedItems } from '@/components/home/RecommendedItems';
import { ExtraServices } from '@/components/home/ExtraServices';
import { SuppliersByRegion } from '@/components/home/SuppliersByRegion';
import { Newsletter } from '@/components/home/Newsletter';
import { CategoryChips } from '@/components/layout/CategoryChips';

export default function HomePage() {
  return (
    <>
      <CategoryChips />
      <Hero />
      <DealsSection />
      <CategorySection title="Home and outdoor" subtitle="Source now" />
      <CategorySection title="Consumer electronics and gadgets" subtitle="Source now" />
      <QuoteSection />
      <RecommendedItems />
      <ExtraServices />
      <SuppliersByRegion />
      <Newsletter />
    </>
  );
}
