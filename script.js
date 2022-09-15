const startFetchDataBtn = document.getElementById("startFetchDataBtn")
let rentedCarsData = []

startFetchDataBtn.addEventListener("click", fetchRentCarsData)



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
    } catch (err) {
        console.error(err)
    }

}