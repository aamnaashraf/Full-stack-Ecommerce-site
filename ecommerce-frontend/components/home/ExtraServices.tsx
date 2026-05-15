'use client';

const services = [
  {
    title: 'Source from Industry Hubs',
    image: '/Mask group (1).png',
  },
  {
    title: 'Customize Your Products',
    image: '/Mask group (2).png',
  },
  {
    title: 'Fast, reliable shipping by ocean or air',
    image: '/Mask group (3).png',
  },
  {
    title: 'Product monitoring and inspection',
    image: '/Mask group (4).png',
  },
];

export const ExtraServices = () => {
  return (
    <section className="py-8 sm:py-12 bg-gray-50 animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our extra services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <div key={index} className="relative bg-white rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-3 sm:p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">{service.title}</h3>
                </div>
              </div>
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
