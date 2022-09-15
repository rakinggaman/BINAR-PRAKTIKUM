const startFetchDataBtn = document.getElementById("startFetchDataBtn")
const rentCarsList = document.getElementById("rentCarsList")
let rentedCarsData = []

startFetchDataBtn.addEventListener("click", fetchRentCarsDataAsyncAwait);



function fetchRentCarsData() {
    fetch('https://bootcamp-rent-car.herokuapp.com/admin/car').
    then(result => result.json()).
    then((result) => {
        rentedCarsData = result
    }).
    catch(err => console.error(err))
}

async function fetchRentCarsDataAsyncAwait() {

    try {
        let result = await fetch('https://bootcamp-rent-car.herokuapp.com/admin/car')
        let rentCars = await result.json()

        rentedCarsData = rentCars

        const first10Cars = rentedCarsData.slice(0, 10)

        first10Cars.forEach((car) => {
            rentCarsList.append(createCarCard(car))

        })

    } catch (err) {
        console.error(err)
    }

}

function createCarCard(car) {
    const carCard = document.createElement('div')
    carCard.setAttribute('class', 'carCard')

    const carImage = document.createElement('img')
    carCard.setAttribute('src', 'carImage')
    carCard.setAttribute('src', avanza.image)

    const carName = document.createElement('p')
    carCard.setAttribute('class', 'carName')
    carName.innerText = avanza.name

    const carPrice = document.createElement('p')
    carPrice.setAttribute('class', 'carPrice')
    carPrice.innerText = avanza.price

    carCard.append(carImage)
    carCard.append(carName)
    carCard.append(carPrice)

    rentCarsList.append(carCard)
}