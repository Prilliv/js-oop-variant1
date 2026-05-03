import { Vehicle } from "./Vehicle.js";

export class Motorcycle extends Vehicle {
  constructor(brand, model, year, mileage, fuelLevel, type) {
    super(brand, model, year, mileage, fuelLevel);
    this.type = type;
  }

  getMaintenance() {
    return super.getMaintenance() + 80;
  }

  getType() {
    return "motorcycle";
  }

  getInfo() {
    return `Мотоцикл: ${super.getInfo()}, тип: ${this.type}`;
  }
}