
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote: "Kisan Connect helped me find better prices for my tomato crop by connecting me directly with food processors. My income increased by 30% compared to selling in the local mandi.",
    author: "Ramesh Patel",
    role: "Vegetable Farmer, Gujarat",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    quote: "The quality assessment tool helped standardize the grading of my wheat harvest. Now I can prove the quality of my produce and negotiate better prices.",
    author: "Sunita Devi",
    role: "Wheat Farmer, Punjab",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "As a processor, I can now source directly from farmers and plan my capacity better with the harvest forecasting feature. It's a win-win for both sides.",
    author: "Vikram Singh",
    role: "Food Processing Company, Maharashtra",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-agri-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-agri-dark mb-4">Trusted by Farmers Across India</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the farmers and processors who have transformed their agricultural 
            businesses using Kisan Connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md bg-white">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-agri-accent mb-4" />
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
