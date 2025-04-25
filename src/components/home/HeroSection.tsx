
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flag, Tractor } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-agri-light py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')] bg-cover bg-center opacity-10" />
      </div>
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-agri-primary">
              <Flag className="h-6 w-6" />
              <Tractor className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-agri-dark">
              Better farming outcomes through smarter processing
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Kisan Connect bridges the gap between farmers and processors, 
              helping reduce waste and increase profits through better post-harvest 
              management and direct market access.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-agri-primary hover:bg-agri-dark text-white">
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-agri-primary text-agri-primary hover:bg-agri-light">
                <Link to="/forecasting">Try Forecasting</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-agri-primary mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10,000+ Farmers</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-agri-primary mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>500+ Processors</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-agri-primary mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>20+ States</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1588935365434-bdb30f959927?q=80&w=2070"
                alt="Indian Farmers Working in Field" 
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  // Fallback image if the primary one fails to load
                  e.currentTarget.src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-[#FF9933] w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">20% Higher Profits</h3>
                  <p className="text-sm text-gray-600">For farmers using our platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
