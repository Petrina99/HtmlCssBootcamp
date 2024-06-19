document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.getElementById("submit-btn");
    addBtn.addEventListener('click', () => addCar());
});

function addCar() {

    const carStorage = JSON.parse(localStorage.getItem("cars")) || [];

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

        window.location.assign('all-cars.html')
    }
}