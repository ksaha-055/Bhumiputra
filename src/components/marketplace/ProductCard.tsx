
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: string;
  location: string;
  distance: string;
  postedDate: string;
  quantity: string;
  seller: string;
  type: "buy" | "sell";
  verified?: boolean;
}

export const ProductCard = ({
  id,
  title,
  image,
  price,
  location,
  distance,
  postedDate,
  quantity,
  seller,
  type,
  verified
}: ProductCardProps) => {
  const handleContact = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your request to contact the ${type === "buy" ? "buyer" : "seller"} of ${title} has been sent.`,
    });
  };

  const handleDetails = () => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${title}. Full product page coming soon.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1557844352-761f2dff3f22?auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge className={type === "buy" 
            ? "bg-blue-100 text-blue-800 hover:bg-blue-100" 
            : "bg-green-100 text-green-800 hover:bg-green-100"
          }>
            {type === "buy" ? "Wanted" : "For Sale"}
          </Badge>
        </div>
        {verified && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              Verified {type === "buy" ? "Buyer" : "Seller"}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="font-bold text-agri-primary text-xl mb-2">{price}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location} ({distance})</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Posted {postedDate}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <div className="text-sm bg-gray-100 px-2 py-1 rounded">
            <span className="text-gray-600">Quantity:</span> {quantity}
          </div>
          <div className="text-sm bg-gray-100 px-2 py-1 rounded">
            <span className="text-gray-600">{type === "buy" ? "Buyer" : "Seller"}:</span> {seller}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button 
          variant="outline" 
          className="border-agri-primary text-agri-primary"
          onClick={handleDetails}
        >
          View Details
        </Button>
        <Button 
          className="bg-agri-primary hover:bg-agri-dark"
          onClick={handleContact}
        >
          Contact {type === "buy" ? "Buyer" : "Seller"}
        </Button>
      </CardFooter>
    </Card>
  );
};
