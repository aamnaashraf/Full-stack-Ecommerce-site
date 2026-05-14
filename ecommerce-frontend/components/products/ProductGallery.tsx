'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.length > 0 ? images : ['/placeholder.png'];
  const hasMultipleImages = displayImages.length > 1;

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-3 sm:p-4 animate-fadeInUp">
      {/* Main Image */}
      <div className="relative w-full aspect-square sm:h-[400px] lg:h-[500px] mb-3 sm:mb-4 rounded-[6px] overflow-hidden border border-[#DEE2E7] group">
        <Image
          src={displayImages[selectedImage] || '/placeholder.png'}
          alt={productName}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Thumbnail Images - Only show if multiple images */}
      {hasMultipleImages && (
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 sm:gap-2">
          {displayImages.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square sm:h-[70px] rounded-[4px] overflow-hidden border transition-all duration-300 hover:scale-105 ${
                selectedImage === index
                  ? 'border-[#0D6EFD] border-2 shadow-lg'
                  : 'border-[#DEE2E7] hover:border-[#0D6EFD] hover:shadow-md'
              }`}
            >
              <Image
                src={image || '/placeholder.png'}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
