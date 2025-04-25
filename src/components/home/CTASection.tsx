
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-agri-primary py-16">
      <div className="container">
        <div className="rounded-2xl bg-[url('https://source.unsplash.com/random/1200x400/?farm,india')] bg-cover bg-center p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-agri-dark bg-opacity-70"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of farmers and processors across India who are using 
              Kisan Connect to improve their post-harvest management and increase profits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-agri-accent hover:bg-amber-500 text-agri-dark font-medium">
                <Link to="/register">Join as Farmer</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/processor-register">Join as Processor</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
