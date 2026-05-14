'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.length > 0 ? images : ['/placeholder.png'];

  return (
    <div className="space-y-4">
      <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={displayImages[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>

      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 bg-gray-200 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-black' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
