import "./style.css";

import { Vehicle } from "./classes/Vehicle.js";
import { Car } from "./classes/Car.js";
import { Truck } from "./classes/Truck.js";
import { Motorcycle } from "./classes/Motorcycle.js";
import { Fleet } from "./classes/Fleet.js";

const fleet = new Fleet();

const form = document.getElementById("vehicleForm");
const typeSelect = document.getElementById("type");
const extraFields = document.getElementById("extraFields");
const vehicleList = document.getElementById("vehicleList");
const stats = document.getElementById("stats");

const filterType = document.getElementById("filterType");
const filterYear = document.getElementById("filterYear");
const filterMileage = document.getElementById("filterMileage");

function renderExtraFields() {
  const type = typeSelect.value;

  if (type === "car") {
    extraFields.innerHTML = `
      <input id="doors" type="number" placeholder="Кількість дверей" required />
      <select id="transmission" required>
        <option value="автомат">Автомат</option>
        <option value="механіка">Механіка</option>
      </select>
    `;
  }

  if (type === "truck") {
    extraFields.innerHTML = `
      <input id="loadCapacity" type="number" placeholder="Вантажність, т" required />
      <select id="isLoaded" required>
        <option value="true">Завантажена</option>
        <option value="false">Порожня</option>
      </select>
    `;
  }

  if (type === "motorcycle") {
    extraFields.innerHTML = `
      <select id="motorcycleType" required>
        <option value="спортивний">Спортивний</option>
        <option value="круїзер">Круїзер</option>
      </select>
    `;
  }
}

function getFilteredVehicles() {
  let vehicles = fleet.vehicles;

  vehicles = Fleet.filterByType(vehicles, filterType.value);
  vehicles = Fleet.filterByYear(vehicles, filterYear.value);
  vehicles = Fleet.filterByMileage(vehicles, filterMileage.value);

  return vehicles;
}

function renderVehicles() {
  const vehicles = getFilteredVehicles();

  vehicleList.innerHTML = "";

  if (vehicles.length === 0) {
    vehicleList.innerHTML = "<p>Транспорт не знайдено.</p>";
    return;
  }

  vehicles.forEach((vehicle) => {
    const originalIndex = fleet.vehicles.indexOf(vehicle);

    const div = document.createElement("div");
    div.className = "vehicle-card";

    div.innerHTML = `
      <h3>${vehicle.getInfo()}</h3>
      <p>Рік: ${vehicle.year}</p>
      <p>Пробіг: ${vehicle.mileage} км</p>
      <p>Паливо: ${vehicle.fuelLevel.toFixed(1)}%</p>
      <p>Обслуговування: ${vehicle.getMaintenance().toFixed(2)} грн</p>

      <button data-action="drive" data-index="${originalIndex}">Проїхати 50 км</button>
      <button data-action="refuel" data-index="${originalIndex}">Заправити +20%</button>
      <button data-action="delete" data-index="${originalIndex}">Видалити</button>
    `;

    vehicleList.appendChild(div);
  });
}

function renderStats() {
  stats.innerHTML = `
    Кількість транспорту: ${fleet.vehicles.length}<br>
    Середній пробіг: ${fleet.getAverageMileage().toFixed(2)} км<br>
    Загальна вартість обслуговування: ${fleet.getTotalMaintenanceCost().toFixed(2)} грн
  `;
}

function render() {
  renderVehicles();
  renderStats();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = typeSelect.value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const year = Number(document.getElementById("year").value);
  const mileage = Number(document.getElementById("mileage").value);
  const fuelLevel = Number(document.getElementById("fuelLevel").value);

  if (!Vehicle.isValidYear(year)) {
    alert("Некоректний рік випуску.");
    return;
  }

  let vehicle;

  if (type === "car") {
    vehicle = new Car(
      brand,
      model,
      year,
      mileage,
      fuelLevel,
      document.getElementById("doors").value,
      document.getElementById("transmission").value
    );
  }

  if (type === "truck") {
    vehicle = new Truck(
      brand,
      model,
      year,
      mileage,
      fuelLevel,
      document.getElementById("loadCapacity").value,
      document.getElementById("isLoaded").value === "true"
    );
  }

  if (type === "motorcycle") {
    vehicle = new Motorcycle(
      brand,
      model,
      year,
      mileage,
      fuelLevel,
      document.getElementById("motorcycleType").value
    );
  }

  fleet.addVehicle(vehicle);
  form.reset();
  renderExtraFields();
  render();
});

vehicleList.addEventListener("click", (event) => {
  const button = event.target;
  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  if (!action) return;

  const vehicle = fleet.vehicles[index];

  if (action === "drive") {
    alert(vehicle.drive(50));
  }

  if (action === "refuel") {
    vehicle.refuel(20);
  }

  if (action === "delete") {
    fleet.removeVehicle(index);
  }

  render();
});

typeSelect.addEventListener("change", renderExtraFields);
filterType.addEventListener("change", render);
filterYear.addEventListener("input", render);
filterMileage.addEventListener("input", render);

renderExtraFields();
render();