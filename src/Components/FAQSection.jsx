import { Link } from "react-router-dom";


const FAQSection = () => {
  return (
    <section className="py-16 bg-[#191919] ">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
        <p className="text-[#FF3600] font-medium mb-2 text-center">★ FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about NeoDrive car rental services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <div className="collapse collapse-arrow bg-[#1E2325] text-white">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What documents do I need to rent a car?
            </div>
            <div className="collapse-content">
              <p>To rent a car from NeoDrive, you'll need:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>A valid driver's license</li>
                <li>Proof of insurance</li>
                <li>A credit card in the renter's name</li>
                <li>A second form of ID (passport or national ID)</li>
              </ul>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-[#1E2325] text-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              What is NeoDrive's fuel policy?
            </div>
            <div className="collapse-content">
              <p>We provide all vehicles with a full tank of fuel. You can:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Return the car with a full tank</li>
                <li>Pre-purchase a full tank at competitive rates</li>
              </ul>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-[#1E2325] text-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How does the insurance coverage work?
            </div>
            <div className="collapse-content">
              <p>NeoDrive offers several insurance options:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Basic coverage (included in rental)</li>
                <li>Premium coverage (additional fee)</li>
                <li>Super Premium with zero deductible</li>
                <li>Third-party liability insurance</li>
              </ul>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-[#1E2325] text-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              What is your cancellation policy?
            </div>
            <div className="collapse-content">
              <p>Our flexible cancellation policy includes:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Free cancellation up to 48 hours before pickup</li>
                <li>50% refund for cancellations within 24-48 hours</li>
                <li>No refund for cancellations under 24 hours</li>
              </ul>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-[#1E2325] text-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              Do you offer long-term rentals?
            </div>
            <div className="collapse-content">
              <p>Yes, we offer special benefits for long-term rentals:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Discounted rates for 30+ day rentals</li>
                <li>Flexible monthly payments</li>
                <li>Priority maintenance service</li>
                <li>Vehicle swap options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <Link to='/contact'>          <button className="btn btn-primary font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  duration-300 border-none rounded-lg hover:scale-105 transition-transform">
            Contact Our Support Team
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
// font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  duration-300 border-none rounded-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-lg