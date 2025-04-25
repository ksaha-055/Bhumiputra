
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Register on the Platform",
    description: "Create your profile as a farmer or processor, add your location and specialization.",
  },
  {
    number: "02",
    title: "List Your Produce or Requirements",
    description: "Farmers list their crops, while processors list their requirements and capacity.",
  },
  {
    number: "03",
    title: "Get Matched & Connect",
    description: "Our system matches farmers with relevant processors based on crop, quality, and location.",
  },
  {
    number: "04",
    title: "Agree on Terms & Transact",
    description: "Negotiate prices, quality standards, and delivery terms directly through the platform.",
  },
];

const HowItWorksSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-agri-dark mb-6">How Kisan Connect Works</h2>
            <p className="text-gray-600 mb-8">
              Our platform simplifies the connection between farmers and processors, 
              creating value through direct relationships and better information.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-agri-accent text-white flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button asChild size="lg" className="bg-agri-primary hover:bg-agri-dark text-white">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-agri-light rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-agri-dark mb-6">Benefits for Everyone</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-agri-primary mb-4">For Farmers</h4>
                <ul className="space-y-3">
                  {[
                    "Higher prices through direct sales",
                    "Reduced waste from better planning",
                    "Access to quality assessment tools",
                    "Reliable processor relationships",
                    "Storage and transportation options"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-agri-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-agri-primary mb-4">For Processors</h4>
                <ul className="space-y-3">
                  {[
                    "Direct sourcing from farmers",
                    "Better quality control and standards",
                    "Reduced procurement costs",
                    "Predictable supply chain",
                    "Diverse sourcing options"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-agri-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
