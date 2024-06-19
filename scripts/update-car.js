document.addEventListener("DOMContentLoaded", () => {

    const str = window.location.href;
    const carStorage = JSON.parse(localStorage.getItem("cars")) || [];

    index = parseInt(str.split("?=")[1]);

    const carToUpdate = carStorage[index];

    editPlaceholders(carToUpdate);

    console.log(carToUpdate)
    const editBtn = document.getElementById("submit-btn");
    editBtn.addEventListener('click', () => editCar(index, carToUpdate, carStorage));
});

function editPlaceholders(carToUpdate) {
    const editForm = document.getElementById("edit-form");

    if (editForm != null) {
        const inputs = editForm.getElementsByTagName('input');

        inputs[0].placeholder = "Current make: " + carToUpdate.carMake;
        inputs[1].placeholder = "Current model: " + carToUpdate.carModel;
        inputs[2].placeholder = "Current horsepower: " + carToUpdate.horsepower;
        inputs[4].placeholder = "Current mileage: " + carToUpdate.mileage;
        inputs[5].placeholder = "Current price: " + carToUpdate.price;
    }
}

function editCar(index, carToUpdate, carStorage) {

    const editForm = document.getElementById("edit-form");

    if (editForm !== null) {
        const inputs = document.getElementsByTagName('input');
        const select = document.getElementById('color-select');

        const yearInput = inputs[3].valueAsDate === null ? inputs[3].valueAsDate : inputs[3].valueAsDate.getFullYear();

        const newCar = {
            carMake: inputs[0].value || carToUpdate.carMake,
            carModel: inputs[1].value || carToUpdate.carModel,
            horsepower: yearInput || carToUpdate.horsepower,
            year: yearInput || carToUpdate.year,
            mileage: inputs[4].valueAsNumber || carToUpdate.mileage,
            price: inputs[5].valueAsNumber || carToUpdate.price,
            color: select.value || carToUpdate.color
        }

        carStorage[index] = newCar;
        
        localStorage.setItem("cars", JSON.stringify(carStorage));
        window.location.assign('all-cars.html')
    }
}