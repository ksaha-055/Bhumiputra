
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tractor, Leaf, CoinsIcon } from "lucide-react";

const schemes = [
  {
    title: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to eligible farmer families in three installments.",
    benefits: "Financial assistance for agricultural needs",
    eligibility: "Small and marginal farmers with less than 2 hectares of land",
    link: "https://pmkisan.gov.in/",
    image: "https://images.unsplash.com/photo-1595700281581-b6bd7c04ec98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Tractor
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Comprehensive crop insurance coverage from pre-sowing to post-harvest losses.",
    benefits: "Protection against crop loss due to natural calamities",
    eligibility: "All farmers growing notified crops",
    link: "https://pmfby.gov.in/",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: Leaf
  },
  {
    title: "Kisan Credit Card (KCC)",
    description: "Easy access to credit for agriculture needs with flexible repayment options.",
    benefits: "Low-interest loans for farming expenses",
    eligibility: "All farmers including small farmers and sharecroppers",
    link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc",
    image: "https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: CoinsIcon
  }
];

const Schemes = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-agri-primary mb-6">Government Farmer Schemes</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Important government schemes available for you. Read the information below and benefit from these programs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={scheme.image} 
                  alt={scheme.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback image if the primary one fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <scheme.icon className="h-5 w-5 text-agri-primary" />
                  {scheme.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{scheme.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-agri-primary mb-1">Benefits:</h4>
                    <p className="text-gray-600">{scheme.benefits}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-agri-primary mb-1">Eligibility:</h4>
                    <p className="text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    More Information
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Schemes;
