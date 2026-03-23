import React, { useState, useRef, useEffect } from "react";
import { categoryData } from "../../pages/ServiecesConstructor/serviceData";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const buttonClasses = "relative px-2 py-1 flex items-center justify-center rounded-full transition-all duration-300 sm:px-4 sm:py-2";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="relative w-full font-garet">
        <div className="flex justify-center items-center py-2 px-4 md:px-16 lg:px-24">
          <div className="flex items-center gap-2 sm:gap-4 bg-white rounded-full py-1 px-2 sm:py-2 sm:px-4 border border-black/20 shadow-sm">
            
            <a
              href="/"
              aria-label="Home"
              className={`${buttonClasses} text-lg sm:text-xl font-deutsch text-black hover:bg-black/20 hoverable pointer-events-auto`}
            >
              NSBH
            </a>
            
            <a 
              className={`${buttonClasses} text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/works"
            >
              Работы
            </a>
            
            <div className="relative pointer-events-auto" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`${buttonClasses} text-black hover:bg-black/20 flex items-center gap-1 hoverable`}
              >
                Услуги
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[1500px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 origin-top ${servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                <div className="p-4 border-b border-gray-100">
                  <a href="/services" className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors">Все услуги →</a>
                </div>
                <div className="p-6 text-black">
                  <div className="grid grid-cols-6 gap-8">
                    {Object.entries(categoryData).map(([key, category]) => (
                      <div key={key} className="space-y-2.5">
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider leading-tight">
                          {category.title}
                        </h4>
                        <div className="space-y-1.5">
                          {category.services.slice(0, 8).map((service, idx) => (
                            <a
                              key={idx}
                              href={service.path}
                              className="block px-2.5 py-0.5 text-xs text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-all duration-200"
                              title={service.title}
                            >
                              {service.title}
                            </a>
                          ))}
                          {category.services.length > 8 && (
                            <a
                              href={category.path}
                              className="block px-2.5 py-0.5 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                              +{category.services.length - 8} ещё
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              className={`${buttonClasses} text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/reviews"
            >
              Отзывы
            </a>

            <a
              className={`${buttonClasses} text-sm sm:text-base text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/blog"
            >
              Блог
            </a>

            <a
              className={`${buttonClasses} text-sm sm:text-base text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/about"
            >
              О нас
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}