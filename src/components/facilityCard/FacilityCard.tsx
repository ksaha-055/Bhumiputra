
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Phone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Facility {
  id: number;
  name: string;
  type: string;
  location: string;
  distance: string;
  rating: number;
  image: string;
  contact: string;
  status?: string;
  capacity: string;
  available?: string;
  cost?: string;
  features?: string[];
  crops?: string[];
  services?: string[];
}

interface FacilityCardProps {
  facility: Facility;
  facilityType: 'processing' | 'storage';
}

export const FacilityCard = ({ facility, facilityType }: FacilityCardProps) => {
  const handleBooking = () => {
    toast({
      title: "Booking Initiated",
      description: `Your booking request for ${facility.name} has been received. We'll confirm shortly.`,
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "Facility Details",
      description: `Viewing details for ${facility.name}. Full details page coming soon.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
            <img 
              src={facility.image} 
              alt={facility.name}
              className="w-full h-full object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80";
              }}
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-start gap-2">
                  <h3 className="font-semibold text-lg">{facility.name}</h3>
                  {facility.status && (
                    <Badge className={
                      facility.status === "Available" 
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : facility.status === "Limited"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }>
                      {facility.status}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-500 text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {facility.location} ({facility.distance})
                </p>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{facility.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div>
                <span className="text-gray-500 text-sm block">Facility Type</span>
                <span className="font-medium">{facility.type}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">
                  {facilityType === 'processing' ? 'Processing Capacity' : 'Total Capacity'}
                </span>
                <span className="font-medium">{facility.capacity}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Contact</span>
                <span className="font-medium flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {facility.contact}
                </span>
              </div>
            </div>
            
            {facilityType === 'processing' && facility.crops && facility.services && (
              <div className="space-y-2">
                <div>
                  <span className="text-gray-500 text-sm">Crops Processed:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {facility.crops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="bg-agri-light">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Services:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {facility.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {facilityType === 'storage' && facility.features && (
              <div>
                <span className="text-gray-500 text-sm">Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {facility.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-agri-light">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2 border-agri-primary text-agri-primary"
                onClick={handleViewDetails}
              >
                Facility Details
              </Button>
              <Button 
                className="bg-agri-primary hover:bg-agri-dark"
                onClick={handleBooking}
              >
                {facilityType === 'processing' ? 'Book Now' : 'Book Storage'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
