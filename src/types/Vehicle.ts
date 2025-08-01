// Vehicle interface definition
export interface Vehicle {
  make: string;
  model: string;
  year: number;
  start(): void;
}

// Car class implementing Vehicle interface
export class Car implements Vehicle {
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