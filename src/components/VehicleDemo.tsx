import { useState } from "react";
import { Car } from "@/types/Vehicle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Play, Car as CarIcon, Zap, Settings } from "lucide-react";

export const VehicleDemo = () => {
  const [make, setMake] = useState("Tesla");
  const [model, setModel] = useState("Model S");
  const [year, setYear] = useState(2024);
  const [carInstance, setCarInstance] = useState<Car | null>(null);
  const [engineStarted, setEngineStarted] = useState(false);
  const { toast } = useToast();

  const createCar = () => {
    const newCar = new Car(make, model, year);
    setCarInstance(newCar);
    setEngineStarted(false);
    console.log(`Created car: ${make} ${model} (${year})`);
    
    toast({
      title: "Vehicle Created! 🚗",
      description: `${make} ${model} (${year}) is ready to drive!`,
    });
  };

  const startEngine = () => {
    if (carInstance) {
      carInstance.start();
      setEngineStarted(true);
      
      toast({
        title: "Engine Started! ⚡",
        description: "Car engine started - Ready to go!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto p-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            TypeScript Vehicle Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of TypeScript interfaces and classes with our interactive vehicle demonstration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vehicle Creation Panel */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 animate-slide-up delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Settings className="w-6 h-6 text-primary" />
                Vehicle Configuration
              </CardTitle>
              <CardDescription>
                Configure your vehicle using TypeScript interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="make" className="text-foreground">Make</Label>
                  <Input
                    id="make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="bg-input/50 border-border focus:border-primary"
                    placeholder="Enter vehicle make"
                  />
                </div>
                <div>
                  <Label htmlFor="model" className="text-foreground">Model</Label>
                  <Input
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-input/50 border-border focus:border-primary"
                    placeholder="Enter vehicle model"
                  />
                </div>
                <div>
                  <Label htmlFor="year" className="text-foreground">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="bg-input/50 border-border focus:border-primary"
                    placeholder="Enter vehicle year"
                  />
                </div>
              </div>
              
              <Button 
                onClick={createCar}
                className="w-full bg-gradient-primary hover:shadow-neon transition-all duration-300"
                size="lg"
              >
                <CarIcon className="w-5 h-5 mr-2" />
                Create Vehicle Instance
              </Button>
            </CardContent>
          </Card>

          {/* Vehicle Status Panel */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 animate-slide-up delay-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CarIcon className="w-6 h-6 text-secondary" />
                Vehicle Status
              </CardTitle>
              <CardDescription>
                Current vehicle instance and engine status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {carInstance ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <h3 className="font-semibold text-lg mb-3">Vehicle Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Make:</span>
                        <Badge variant="secondary">{carInstance.make}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <Badge variant="secondary">{carInstance.model}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <Badge variant="secondary">{carInstance.year}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                    <span className="font-medium">Engine Status:</span>
                    <Badge 
                      variant={engineStarted ? "default" : "outline"}
                      className={engineStarted ? "bg-neon-green text-black animate-pulse-glow" : ""}
                    >
                      {engineStarted ? "Running" : "Stopped"}
                    </Badge>
                  </div>
                  
                  <Button 
                    onClick={startEngine}
                    className="w-full bg-gradient-electric hover:shadow-electric transition-all duration-300"
                    size="lg"
                    disabled={engineStarted}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {engineStarted ? "Engine Running" : "Start Engine"}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Create a vehicle instance to see status details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Code Display */}
        <Card className="mt-8 bg-card/80 backdrop-blur-sm border-border/50 animate-slide-up delay-600">
          <CardHeader>
            <CardTitle className="text-2xl">TypeScript Implementation</CardTitle>
            <CardDescription>
              Interface and class definitions powering this demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg border border-border/50 overflow-x-auto">
              <pre className="text-sm text-foreground">
                <code>{`// Vehicle interface definition
interface Vehicle {
  make: string;
  model: string;
  year: number;
  start(): void;
}

// Car class implementing Vehicle interface
class Car implements Vehicle {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  start(): void {
    console.log("Car engine started");
  }
}

// Create instance and test
const myCar = new Car("${make}", "${model}", ${year});
myCar.start(); // Logs: "Car engine started"`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};