
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid3x3, ListFilter, Map, ChevronDown, Check } from "lucide-react";

// Sample marketplace data with West Bengal locations
const produceListings = [
  {
    id: 1,
    name: "Premium Wheat",
    farmer: "Raj Kumar",
    location: "Howrah, West Bengal",
    quantity: "5000 kg",
    quality: "Grade A",
    price: "₹2,200 per quintal",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec05?auto=format&fit=crop&q=80",
    distance: "15 km",
    harvest_date: "10 days ago",
  },
  {
    id: 2,
    name: "Organic Rice",
    farmer: "Anita Sharma",
    location: "Burdwan, West Bengal",
    quantity: "3000 kg",
    quality: "Organic Certified",
    price: "₹3,500 per quintal",
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80",
    distance: "25 km",
    harvest_date: "5 days ago",
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    farmer: "Sanjay Patil",
    location: "Kolkata, West Bengal",
    quantity: "800 kg",
    quality: "Fresh Grade B+",
    price: "₹25 per kg",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80",
    distance: "8 km",
    harvest_date: "2 days ago",
  },
  {
    id: 4,
    name: "Darjeeling Tea",
    farmer: "Venkat Reddy",
    location: "Siliguri, West Bengal",
    quantity: "500 kg",
    quality: "Grade A",
    price: "₹280 per kg",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80",
    distance: "32 km",
    harvest_date: "15 days ago",
  },
  {
    id: 5,
    name: "Jute Fiber",
    farmer: "Harpreet Singh",
    location: "Malda, West Bengal",
    quantity: "2000 kg",
    quality: "Long Fiber",
    price: "₹6,200 per quintal",
    image: "https://images.unsplash.com/photo-1598012268972-f981410b85c0?auto=format&fit=crop&q=80",
    distance: "45 km",
    harvest_date: "20 days ago",
  },
  {
    id: 6,
    name: "Fresh Vegetables",
    farmer: "Meena Kumari",
    location: "Durgapur, West Bengal",
    quantity: "4500 kg",
    quality: "Grade B",
    price: "₹3,800 per quintal",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80",
    distance: "18 km",
    harvest_date: "8 days ago",
  },
];

const processorRequirements = [
  {
    id: 1,
    title: "Rice for Food Products",
    company: "Bengal Food Processing Pvt Ltd",
    location: "Kolkata, West Bengal",
    crop: "Rice",
    quantity_needed: "50000 kg",
    quality_req: "Grade A or Organic",
    offered_price: "₹3,700 per quintal",
    logo: "https://images.unsplash.com/photo-1557053815-9f79f70c7980?auto=format&fit=crop&q=80&w=100&h=100",
    deadline: "5 days",
  },
  {
    id: 2,
    title: "Tomatoes for Ketchup Production",
    company: "Tasty Sauces Ltd",
    location: "Durgapur, West Bengal",
    crop: "Tomatoes",
    quantity_needed: "20000 kg",
    quality_req: "Fresh Grade B or higher",
    offered_price: "₹28 per kg",
    logo: "https://images.unsplash.com/photo-1581012771300-20e8f197b3a3?auto=format&fit=crop&q=80&w=100&h=100",
    deadline: "3 days",
  },
  {
    id: 3,
    title: "Wheat for Flour Mill",
    company: "Traditional Flour Mills",
    location: "Howrah, West Bengal",
    crop: "Wheat",
    quantity_needed: "100000 kg",
    quality_req: "Premium Grade",
    offered_price: "₹2,350 per quintal",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=100&h=100",
    deadline: "10 days",
  },
  {
    id: 4,
    title: "Tea Leaves for Processing",
    company: "Bengal Tea Exporters",
    location: "Siliguri, West Bengal",
    crop: "Tea",
    quantity_needed: "30000 kg",
    quality_req: "High Quality",
    offered_price: "₹315 per kg",
    logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=100&h=100",
    deadline: "7 days",
  },
];

const Marketplace = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([1000]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Agricultural Marketplace</h1>
            <p className="text-gray-600">
              Connect directly with farmers and processors to buy and sell agricultural produce
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-agri-primary hover:bg-agri-dark" onClick={() => window.alert("New listing form will open here")}>
              + Add New Listing
            </Button>
          </div>
        </div>

        <Tabs defaultValue="produce" className="w-full">
          <TabsList className="mb-8 bg-agri-light">
            <TabsTrigger value="produce" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              Available Produce
            </TabsTrigger>
            <TabsTrigger value="requirements" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              Processor Requirements
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center mb-4">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Search</label>
                      <Input placeholder="Search produce..." />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Crop Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Crops" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Crops</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="tea">Tea</SelectItem>
                          <SelectItem value="jute">Jute</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Quality Grade</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Grades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          <SelectItem value="a">Grade A</SelectItem>
                          <SelectItem value="b">Grade B</SelectItem>
                          <SelectItem value="c">Grade C</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Price Range (₹/quintal): {priceRange[0]}
                      </label>
                      <Slider
                        defaultValue={[1000]}
                        max={10000}
                        step={100}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="kolkata">Kolkata</SelectItem>
                          <SelectItem value="howrah">Howrah</SelectItem>
                          <SelectItem value="siliguri">Siliguri</SelectItem>
                          <SelectItem value="durgapur">Durgapur</SelectItem>
                          <SelectItem value="burdwan">Burdwan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Harvest Date</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Past Week</SelectItem>
                          <SelectItem value="month">Past Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-agri-primary text-agri-primary"
                      onClick={() => window.alert("Filters reset")}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <TabsContent value="produce" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">{produceListings.length} listings found</p>
                  
                  <div className="flex items-center gap-2">
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex border rounded-md overflow-hidden">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={view === "grid" ? "bg-agri-light" : ""}
                        onClick={() => setView("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={view === "list" ? "bg-agri-light" : ""}
                        onClick={() => setView("list")}
                      >
                        <ListFilter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {view === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produceListings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={listing.image} 
                            alt={listing.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105" 
                          />
                          <div className="absolute top-2 right-2 bg-agri-accent text-agri-dark text-sm font-medium py-1 px-2 rounded">
                            {listing.harvest_date}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{listing.name}</h3>
                            <div className="text-agri-primary font-bold">{listing.price}</div>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">{listing.farmer} • {listing.location}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">Quantity:</span> {listing.quantity}
                            </div>
                            <div>
                              <span className="text-gray-500">Quality:</span> {listing.quality}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Map className="h-4 w-4 mr-1" />
                              {listing.distance}
                            </div>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-agri-primary hover:bg-agri-dark"
                              onClick={() => window.alert(`Contact form for ${listing.farmer} will open here`)}
                            >
                              Contact Farmer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {produceListings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-48 h-48">
                              <img 
                                src={listing.image} 
                                alt={listing.name}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{listing.name}</h3>
                                  <p className="text-gray-500 text-sm">{listing.farmer} • {listing.location}</p>
                                </div>
                                <div className="text-agri-primary font-bold">{listing.price}</div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm my-4">
                                <div>
                                  <span className="text-gray-500 block">Quantity</span> 
                                  {listing.quantity}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Quality</span> 
                                  {listing.quality}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Distance</span> 
                                  {listing.distance}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Harvested</span> 
                                  {listing.harvest_date}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="bg-agri-primary hover:bg-agri-dark"
                                  onClick={() => window.alert(`Contact form for ${listing.farmer} will open here`)}
                                >
                                  Contact Farmer
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {processorRequirements.map((req) => (
                    <Card key={req.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            <img 
                              src={req.logo} 
                              alt={req.company}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{req.title}</h3>
                              <div className="text-red-500 text-sm font-medium">
                                {req.deadline} left
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm">{req.company} • {req.location}</p>
                          </div>
                        </div>
                        
                        <div className="bg-agri-light mt-4 p-3 rounded-lg space-y-2">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500 block">Crop</span> 
                              {req.crop}
                            </div>
                            <div>
                              <span className="text-gray-500 block">Quantity Needed</span> 
                              {req.quantity_needed}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-sm">Quality Requirements</span> 
                            <p className="text-sm">{req.quality_req}</p>
                          </div>
                          <div className="pt-2">
                            <span className="text-gray-500 block text-sm">Offered Price</span> 
                            <p className="text-agri-primary font-bold">{req.offered_price}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-agri-primary hover:bg-agri-dark"
                            onClick={() => window.alert(`Proposal form for ${req.company} will open here`)}
                          >
                            Submit Proposal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
