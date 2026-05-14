'use client';

import Image from 'next/image';

const regions = [
  { name: 'Arabic Emirates', flag: '/flags/Property 1=AE.png', suppliers: 'shopname.ae' },
  { name: 'Australia', flag: '/flags/Property 1=AU.png', suppliers: 'shopname.au' },
  { name: 'United States', flag: '/flags/Property 1=US.png', suppliers: 'shopname.us' },
  { name: 'Russia', flag: '/flags/Property 1=RU.png', suppliers: 'shopname.ru' },
  { name: 'Italy', flag: '/flags/Property 1=IT.png', suppliers: 'shopname.it' },
  { name: 'Denmark', flag: '/flags/Property 1=DK.png', suppliers: 'shopname.dk' },
  { name: 'France', flag: '/flags/Property 1=FR.png', suppliers: 'shopname.fr' },
  { name: 'Germany', flag: '/flags/DE@2x.png', suppliers: 'shopname.de' },
  { name: 'China', flag: '/flags/Property 1=CN.png', suppliers: 'shopname.cn' },
  { name: 'Great Britain', flag: '/flags/Property 1=GB.png', suppliers: 'shopname.uk' },
];

export const SuppliersByRegion = () => {
  return (
    <section className="py-8 sm:py-12 bg-white animate-fadeInUp">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Suppliers by region</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {regions.map((region, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
                <Image
                  src={region.flag}
                  alt={`${region.name} flag`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 text-xs sm:text-sm truncate">{region.name}</h3>
                <p className="text-xs text-gray-500 truncate">{region.suppliers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
