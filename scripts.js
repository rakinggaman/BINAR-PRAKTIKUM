// dapatkan elemen div dengan id "rentCarsList" 
const rentCarsList = document.getElementById("rentCarsList")

// mendapatkan div dengan id pageInputSection
const pageInputSection = document.getElementById("pageInputSection")

// mendapatkan input teks dengan id currentPageInput
const currentPageInput = document.getElementById("currentPageInput")

// mendapatkan div dengan id searchInputSection
const searchInputSection = document.getElementById("searchInputSection")

// mendapatkan input teks dengan id searchInput
const searchInput = document.getElementById("searchInput")

// mendapatkan button dengan id prevPageBtn
const prevPageBtn = document.getElementById("prevPageBtn")

// mendapatkan button dengan id nextPageBtn
const nextPageBtn = document.getElementById("nextPageBtn")

// mendapatkan button dengan id nextPageBtn
const pageDisplayTxt = document.getElementById("pageDisplayTxt")

// penyimpanan data yang ditarik dari API
let rentedCarsData = []

// penyimpanan data yang akan ditampilkan
let displayedCarsData = []

// ukuran halaman yang ditampilkan
const pageSize = 10

// total jumlah halaman yang tersedia
let pageCount = 0

//variabel halaman berapa sekarang
let currentPage = 0

// mengambil data dari API - cara Promise.then dan Promise.catch
function fetchRentCarsData() {
    fetch('https://bootcamp-rent-car.herokuapp.com/admin/car').
    then(result => result.json()).
    then((result) => {
        rentedCarsData = result
    }).
    catch(err => console.error(err))
}

// mengambil data dari API - cara async/await
async function fetchRentCarsDataAsyncAwait() {
    try {
        // sembunyikan pageInputSection
        pageInputSection.setAttribute('class', 'doNotDisplay')
        searchInputSection.setAttribute('class', 'doNotDisplay')

        let result = await fetch('https://bootcamp-rent-car.herokuapp.com/admin/car')
        let rentCars = await result.json()

        rentedCarsData = rentCars

        // menghitung jumlah halaman tersedia dari jumlah data yang diterima dari API
        pageCount = Math.floor(rentedCarsData.length / pageSize)
        const remainder = (rentedCarsData.length % pageSize) > 0 ? 1 : 0
        pageCount += remainder

        // mulai menampilkan data dari halaman pertama
        currentPage = 1
        getCarsPage()

        // tampilkan form navigasi halaman
        pageInputSection.removeAttribute('class')
        searchInputSection.removeAttribute('class')

    } catch (err) {
        // jika terdapat error, maka akan print errornya
        console.error(err)
    }
}

// untuk menghapus seluruh child element di dalam rentCarsList
// digunakan saat pergantian halaman
function clearRentCarList() {
    while (rentCarsList.firstChild) {
        rentCarsList.firstChild.remove()
    }
}

function updatePageDisplayText() {
    pageDisplayTxt.innerHTML = `${currentPage}/${pageCount}`
}

function updatePaginationButtons() {
    if (currentPage <= 1) {
        prevPageBtn.setAttribute('disabled', 'true')
    }

    if (currentPage >= pageCount) {
        nextPageBtn.setAttribute('disabled', 'true')
    }

    if (currentPage > 1 && currentPage < pageCount) {
        prevPageBtn.removeAttribute('disabled')
        nextPageBtn.removeAttribute('disabled')
    }
}

// untuk mengambil data per halaman dari rentedCarsData
// dan menampilkan nya
function getCarsPage() {
    // jika halaman yang di inginkan lebih besar dari jumlah
    // halaman yang tersedia, maka batalkan proses penampilan data
    if (currentPage > pageCount || rentedCarsData.length == 0 || currentPage <= 0) {
        return;
    }

    // mulai mengambil dari array
    const start = (currentPage - 1) * pageSize
        // akhir index ambil array: start + besaran halaman
    const end = start + pageSize

    // ambil data dari array
    displayedCarsData = rentedCarsData.slice(start, end)

    // kosongkan list rentCarsList
    clearRentCarList()

    // mulai menambahkan item mobil kedalam rentCarsList
    displayedCarsData.forEach((car) => {
        // masukkan item card mobil ke rentCarsList 
        // agar dapat ditampilkan
        rentCarsList.append(createCarCard(car))
    })

    updatePageDisplayText()
    updatePaginationButtons()
}


function getCarsBySearch(searchTerm) {
    if (!searchTerm) {
        return;
    }

    displayedCarsData = rentedCarsData.filter((carData) => {
        return carData.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    // kosongkan list rentCarsList
    clearRentCarList()

    // mulai menambahkan item mobil kedalam rentCarsList
    displayedCarsData.forEach((car) => {
        // masukkan item card mobil ke rentCarsList 
        // agar dapat ditampilkan
        rentCarsList.append(createCarCard(car))
    })
}

prevPageBtn.addEventListener("click", () => {
    if (currentPage <= 1) {
        return;
    }

    currentPage -= 1
    getCarsPage()
})

nextPageBtn.addEventListener("click", () => {
    if (currentPage >= pageCount) {
        return;
    }

    currentPage += 1
    getCarsPage()
})


searchInput.addEventListener("change", (event) => {
    const value = event.target.value

    if (!value) {
        getCarsPage(1)
    }

    getCarsBySearch(value)
})

// untuk membuat komponen card yang menampilkan info dari mobil
// yang tersedia
function createCarCard(car) {
    /*
    kode dibawah untuk menghasilkan HTML setara:
    <div class="carCard">
        <img src="dari car.image" class="carImage" />
        <p class="carName">dari car.name</p>
        <p class="carPrice">dari car.price]</p>
    </div>
    */

    const carCard = document.createElement('div')
    carCard.setAttribute('class', 'carCard')

    const carImage = document.createElement('img')
    carImage.setAttribute('class', 'carImage')
    carImage.setAttribute('src', car.image)

    const carName = document.createElement('p')
    carName.setAttribute('class', 'carName')
    carName.innerText = car.name

    const carPrice = document.createElement('p')
    carPrice.setAttribute('class', 'carPrice')
    carPrice.innerText = car.price

    // masukkan semua elemen child ke carCard agar dapat ditampilkan
    carCard.append(carImage)
    carCard.append(carName)
    carCard.append(carPrice)

    return carCard
}

fetchRentCarsDataAsyncAwait()