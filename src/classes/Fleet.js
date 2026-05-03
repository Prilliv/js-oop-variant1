export class Fleet {
  constructor() {
    this.vehicles = [];
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  removeVehicle(index) {
    this.vehicles.splice(index, 1);
  }

  getAverageMileage() {
    if (this.vehicles.length === 0) return 0;

    const total = this.vehicles.reduce((sum, vehicle) => sum + vehicle.mileage, 0);
    return total / this.vehicles.length;
  }

  getTotalMaintenanceCost() {
    return this.vehicles.reduce((sum, vehicle) => sum + vehicle.getMaintenance(), 0);
  }

  static filterByType(vehicles, type) {
    if (type === "all") return vehicles;
    return vehicles.filter(vehicle => vehicle.getType() === type);
  }

  static filterByYear(vehicles, year) {
    if (!year) return vehicles;
    return vehicles.filter(vehicle => vehicle.year >= Number(year));
  }

  static filterByMileage(vehicles, mileage) {
    if (!mileage) return vehicles;
    return vehicles.filter(vehicle => vehicle.mileage <= Number(mileage));
  }
}