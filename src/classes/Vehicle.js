export class Vehicle {
  #fuelLevel;

  constructor(brand, model, year, mileage, fuelLevel) {
    this.brand = brand;
    this.model = model;
    this.year = Number(year);
    this.mileage = Number(mileage);
    this.#fuelLevel = Number(fuelLevel);
  }

  get fuelLevel() {
    return this.#fuelLevel;
  }

  set fuelLevel(value) {
    if (value < 0) this.#fuelLevel = 0;
    else if (value > 100) this.#fuelLevel = 100;
    else this.#fuelLevel = value;
  }

  drive(distance) {
    const fuelConsumption = distance * 0.1;

    if (this.#fuelLevel < fuelConsumption) {
      return "Недостатньо палива для поїздки.";
    }

    this.mileage += distance;
    this.fuelLevel = this.#fuelLevel - fuelConsumption;

    return `Транспорт проїхав ${distance} км.`;
  }

  refuel(amount) {
    this.fuelLevel = this.#fuelLevel + Number(amount);
  }

  getMaintenance() {
    return this.mileage * 0.05;
  }

  getInfo() {
    return `${this.brand} ${this.model}, ${this.year}`;
  }

  getType() {
    return "vehicle";
  }

  static isValidYear(year) {
    const currentYear = new Date().getFullYear();
    return year >= 1950 && year <= currentYear;
  }
}