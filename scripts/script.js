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

    const addBtn = document.getElementById("add-car-btn");

    addBtn.addEventListener('click', () => addCarForm());
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
            updateButton.addEventListener('click', () => updateRow(index));
    
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
}

function updateRow(index) {

    const carToUpdate = carStorage[index];

    const editForm = document.getElementById("edit-form");

    if (editForm !== null) {
        const makeIn = document.createElement('input');
        makeIn.placeholder = 'Current make: ' + carToUpdate.carMake;
        makeIn.type = "text";
        const modelIn = document.createElement('input');
        modelIn.placeholder = 'Current model: ' + carToUpdate.carModel;
        modelIn.type = "text";
        const hpIn = document.createElement('input');
        hpIn.placeholder = 'Current horsepower: ' + carToUpdate.horsepower;
        hpIn.type = "number";
        const yearIn = document.createElement('input');
        yearIn.placeholder = 'Current year: ' + carToUpdate.year;
        yearIn.type = "date";
        const mileageIn = document.createElement('input');
        mileageIn.placeholder = 'Current mileage: ' + carToUpdate.mileage;
        mileageIn.type = "number";
        const priceIn = document.createElement('input');
        priceIn.placeholder = 'Current price: ' + carToUpdate.price;
        priceIn.type = "number";

        const colorSelect = document.createElement('select');
        colorSelect.id = "color-select"
        const redOption = document.createElement('option');
        redOption.value = "Red";
        redOption.innerHTML = "Red";

        const blueOption = document.createElement('option');
        blueOption.value = "Blue";
        blueOption.innerHTML = "Blue";

        const blackOption = document.createElement('option');
        blackOption.value = "Black";
        blackOption.innerHTML = "Black";

        const whiteOption = document.createElement('option');
        whiteOption.value = "White";
        whiteOption.innerHTML = "White";

        colorSelect.appendChild(redOption);
        colorSelect.appendChild(blackOption);
        colorSelect.appendChild(blueOption);
        colorSelect.appendChild(whiteOption);

        const submitBtn = document.createElement('button');
        submitBtn.innerHTML = "Edit";
        submitBtn.classList.add('actionbtn');

        editForm.appendChild(makeIn);
        editForm.appendChild(modelIn);
        editForm.appendChild(hpIn);
        editForm.appendChild(yearIn);
        editForm.appendChild(mileageIn);
        editForm.appendChild(priceIn);
        editForm.appendChild(colorSelect);
        editForm.appendChild(submitBtn);

        submitBtn.addEventListener('click', () => editCar(index));
    }
}

function editCar(index) {
    const carToUpdate = carStorage[index];

    const editForm = document.getElementById("edit-form");

    if (editForm !== null) {
        const inputs = document.getElementsByTagName('input');
        const select = document.getElementById('color-select');

        carToUpdate.carMake = inputs[0].value || carToUpdate.carMake;
        carToUpdate.carModel = inputs[1].value || carToUpdate.carModel;
        carToUpdate.horsepower = inputs[2].valueAsNumber || carToUpdate.horsepower;
        carToUpdate.year = inputs[3].valueAsDate.getFullYear() || carToUpdate.year;
        carToUpdate.mileage = inputs[4].valueAsNumber || carToUpdate.mileage;
        carToUpdate.price = inputs[5].valueAsNumber || carToUpdate.price;
        carToUpdate.color = select.value || carToUpdate.color;

        const newCar = {
            carMake: inputs[0].value || carToUpdate.carMake,
            carModel: inputs[1].value || carToUpdate.carModel,
            horsepower: inputs[2].valueAsNumber || carToUpdate.horsepower,
            year: inputs[3].valueAsDate.getFullYear() || carToUpdate.year,
            mileage: inputs[4].valueAsNumber || carToUpdate.mileage,
            price: inputs[5].valueAsNumber || carToUpdate.price,
            color: select.value || carToUpdate.color
        }

        carStorage[index] = newCar;

        localStorage.setItem("cars", JSON.stringify(carStorage));
    }
}

function addCarForm() {

    const createForm = document.getElementById("create-form");

    if (createForm !== null) {
        const makeIn = document.createElement('input');
        makeIn.placeholder = 'Make';
        makeIn.type = "text";
        const modelIn = document.createElement('input');
        modelIn.placeholder = 'Model';
        modelIn.type = "text";
        const hpIn = document.createElement('input');
        hpIn.placeholder = 'Horsepower';
        hpIn.type = "number";
        const yearIn = document.createElement('input');
        yearIn.placeholder = 'Year';
        yearIn.type = "date";
        const mileageIn = document.createElement('input');
        mileageIn.placeholder = 'Mileage';
        mileageIn.type = "number";
        const priceIn = document.createElement('input');
        priceIn.placeholder = 'Price';
        priceIn.type = "number";

        const colorSelect = document.createElement('select');
        colorSelect.id = "color-select"
        const redOption = document.createElement('option');
        redOption.value = "Red";
        redOption.innerHTML = "Red";

        const blueOption = document.createElement('option');
        blueOption.value = "Blue";
        blueOption.innerHTML = "Blue";

        const blackOption = document.createElement('option');
        blackOption.value = "Black";
        blackOption.innerHTML = "Black";

        const whiteOption = document.createElement('option');
        whiteOption.value = "White";
        whiteOption.innerHTML = "White";

        colorSelect.appendChild(redOption);
        colorSelect.appendChild(blackOption);
        colorSelect.appendChild(blueOption);
        colorSelect.appendChild(whiteOption);

        const submitBtn = document.createElement('button');
        submitBtn.innerHTML = "Add";
        submitBtn.classList.add('actionbtn');

        createForm.appendChild(makeIn);
        createForm.appendChild(modelIn);
        createForm.appendChild(hpIn);
        createForm.appendChild(yearIn);
        createForm.appendChild(mileageIn);
        createForm.appendChild(priceIn);
        createForm.appendChild(colorSelect);
        createForm.appendChild(submitBtn);

        submitBtn.addEventListener('click', () => createCar());
    }
}

function createCar() {
    const createForm = document.getElementById("create-form");

    if (createForm !== null) {
        const inputs = document.getElementsByTagName('input');
        const select = document.getElementById('color-select');

        const newCar = {
            carMake: inputs[0].value,
            carModel: inputs[1].value,
            horsepower: inputs[2].valueAsNumber,
            year: inputs[3].valueAsDate.getFullYear(),
            mileage: inputs[4].valueAsNumber,
            price: inputs[5].valueAsNumber,
            color: select.value
        }

        carStorage.push(newCar);
        localStorage.setItem("cars", JSON.stringify(carStorage));
    }
}