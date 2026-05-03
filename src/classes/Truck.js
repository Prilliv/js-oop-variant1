import { Vehicle } from "./Vehicle.js";

export class Truck extends Vehicle {
  constructor(brand, model, year, mileage, fuelLevel, loadCapacity, isLoaded) {
    super(brand, model, year, mileage, fuelLevel);
    this.loadCapacity = Number(loadCapacity);
    this.isLoaded = isLoaded;
  }

  getMaintenance() {
    return super.getMaintenance() + this.loadCapacity * 20;
  }

  getType() {
    return "truck";
  }

  getInfo() {
    return `Вантажівка: ${super.getInfo()}, вантажність: ${this.loadCapacity} т, завантажена: ${this.isLoaded ? "так" : "ні"}`;
  }
}