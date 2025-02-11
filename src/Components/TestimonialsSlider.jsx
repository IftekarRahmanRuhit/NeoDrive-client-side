
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Business Executive",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    comment: "Renting a car from NeoDrive was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive."
  },
  {
    id: 2,
    name: "Alis White",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    rating: 4,
    comment: "Outstanding service from NeoDrive! The booking process was seamless, and the car was in perfect condition. Will definitely use their service again."
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Travel Enthusiast",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    rating: 5,
    comment: "NeoDrive made my business trip hassle-free. The car was clean, well-maintained, and the staff was exceptionally professional."
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Digital Nomad",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5,
    comment: "I'm impressed with NeoDrive's attention to detail. From pickup to drop-off, everything was smooth and professional. Highly recommended!"
  },
  {
    id: 5,
    name: "Robert Chen",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 5,
    comment: "The premium car selection at NeoDrive is outstanding. I got a luxury vehicle at a very reasonable price. Excellent customer service!"
  },
  {
    id: 6,
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    rating: 4,
    comment: "NeoDrive offers the perfect blend of quality and affordability. Their fleet is modern and well-maintained. Great experience overall!"
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-red-500' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesPerView = 3;
  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  return (
    <section className="bg-[#1E2325] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <p className="text-[#FF3600] font-medium mb-2">★ Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say About NeoDrive
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why customers choose NeoDrive for their car rental needs and what makes our service stand out.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-[#FF3600] p-3 rounded-full shadow-lg hover:bg-[#FF3600] transition-all duration-200 hidden md:block"
          >
            <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-[#FF3600] p-3 rounded-full shadow-lg hover:bg-[#FF3600] transition-all duration-200 hidden md:block"
          >
            <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className="flex flex-nowrap min-w-full">
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full">
                    {testimonials
                      .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="bg-[#191919] p-8 rounded-lg shadow-lg border border-none transform transition-all duration-300 hover:shadow-md cursor-pointer"
                        >
                          <div className="space-y-6">
                            <StarRating rating={testimonial.rating} />
                            <p className="text-gray-200 text-sm leading-relaxed">
                              {testimonial.comment}
                            </p>
                            <div className="flex items-center gap-4">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-[#FF3600]">{testimonial.name}</h3>
                                <p className="text-gray-200 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-6 bg-red-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;