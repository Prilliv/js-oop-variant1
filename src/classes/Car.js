import { Vehicle } from "./Vehicle.js";

export class Car extends Vehicle {
  constructor(brand, model, year, mileage, fuelLevel, doors, transmission) {
    super(brand, model, year, mileage, fuelLevel);
    this.doors = Number(doors);
    this.transmission = transmission;
  }

  getMaintenance() {
    return super.getMaintenance() + 150;
  }

  getType() {
    return "car";
  }

  getInfo() {
    return `Автомобіль: ${super.getInfo()}, дверей: ${this.doors}, коробка: ${this.transmission}`;
  }
}