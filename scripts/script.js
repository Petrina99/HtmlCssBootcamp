const seedData = [
    {
        carMake: "BMW",
        carModel: "Series 5",
        horsepower: 250,
        year: new Date("2022").getFullYear(),
        mileage: 29000,
        price: 35000,
        color: "Red"
    }, {
        carMake: "Suzuki",
        carModel: "Vitara",
        horsepower: 135,
        year: new Date("2019").getFullYear(),
        mileage: 178000,
        price: 14000,
        color: "Blue"
    }, {
        carMake: "Fiat",
        carModel: "Punto",
        horsepower: 110,
        year: new Date("2005").getFullYear(),
        mileage: 389340,
        price: 3500,
        color: "Black"
    }, {
        carMake: "Audi",
        carModel: "A6",
        horsepower: 260,
        year: new Date("2024").getFullYear(),
        mileage: 3500,
        price: 57000,
        color: "White"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

function getCarStorage() {
    return JSON.parse(localStorage.getItem("cars")) || [];
}

const carStorage = getCarStorage();

function loadData() {

    if (carStorage.length === 0) {
        localStorage.setItem("cars", JSON.stringify(seedData));
        carStorage = getCarStorage();
    }

    const tableBody = document.getElementById('tbody');

    tableBody.innerHTML = ""

    if (tableBody !== null) {
        carStorage.map((car, index) => {
            const row = document.createElement("tr");
            const make = document.createElement("td");
            const model = document.createElement("td");
            const horsepower = document.createElement("td");
            const year = document.createElement("td");
            const mileage = document.createElement("td");
            const price = document.createElement("td");
            const color = document.createElement("td")
            const actions = document.createElement("td");
    
            make.innerText = car.carMake;
            model.innerText = car.carModel;
            horsepower.innerText = car.horsepower;
            year.innerText = car.year;
            mileage.innerText = car.mileage;
            price.innerText = car.price;
            color.innerHTML = car.color;
    
            const updateButton = document.createElement('button');
            updateButton.innerHTML = "Update"
            updateButton.classList.add('actionbtn')
            updateButton.addEventListener('click', () => window.location.href = `edit-car.html?=${index}`);
    
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = "Delete"
            deleteButton.classList.add('actionbtn')
            deleteButton.addEventListener('click', () => deleteRow(index));
            
            actions.append(updateButton);
            actions.append(deleteButton);

            row.appendChild(make);
            row.appendChild(model);
            row.appendChild(horsepower);
            row.appendChild(year);
            row.appendChild(mileage);
            row.appendChild(price);
            row.appendChild(color);
            row.append(actions);

            tableBody.appendChild(row);
        })
    }
    
}

function deleteRow(index) {
    carStorage.splice(index, 1);

    localStorage.setItem("cars", JSON.stringify(carStorage));

    loadData();
}