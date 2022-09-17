// dapatkan elemen tombol "MULAI AMBIL DATA" dan div dengan id "rentCarsList" 
const startFetchDataBtn = document.getElementById("startFetchDataBtn")
const rentCarsList = document.getElementById("rentCarsList")

// mendapatkan div dengan id pageInputSection
const pageInputSection = document.getElementById("pageInputSection")

// mendapatkan div dengan id searchInputSection
const searchInputSection = document.getElementById("searchInputSection")


// mendapatkan div dengan id pageInputSection
const searchInput = document.getElementById("searchInput")

// mendapatkan input teks dengan id currentPageInput
const currentPageInput = document.getElementById("currentPageInput")



// penyimpanan data yang ditarik dari API
let rentedCarsData = []

// penyimpanan data yang akan ditampilkan
let displayedCarsData = []

// ukuran halaman yang ditampilkan
const pageSize = 10

// total jumlah halaman yang tersedia
let pageCount = 0

// ketika tombol startFetchDataBtn diklik, maka akan memanggil fungsi fetchRentCarsDataAsyncAwait
startFetchDataBtn.addEventListener("click", fetchRentCarsDataAsyncAwait)

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
        searchInputSecton.setAttribute('class', 'doNotDisplay')

        let result = await fetch('https://bootcamp-rent-car.herokuapp.com/admin/car')
        let rentCars = await result.json()

        rentedCarsData = rentCars

        // menghitung jumlah halaman tersedia dari jumlah data yang diterima dari API
        pageCount = Math.floor(rentedCarsData.length / pageSize)
        const remainder = (rentedCarsData.length % pageSize) > 0 ? 1 : 0
        pageCount += remainder

        // mulai menampilkan data dari halaman pertama
        getCarsPage(1)

        // tampilkan form navigasi halaman
        pageInputSection.removeAttribute('class')

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

// untuk mengambil data per halaman dari rentedCarsData
// dan menampilkan nya
function getCarsPage(currentPage) {
    // jika halaman yang di inginkan lebih besar dari jumlah
    // halaman yang tersedia, maka batalkan proses penampilan data
    if (currentPage > pageCount || rentedCarsData.length == 0) {
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
}



// menambahkan event listener ketika teks dimasukkan dan ditekan enter
// dengan callback berisi pengubahan halaman yang ditampilkan
currentPageInput.addEventListener("change", (event) => {
    // ubah string jadi angka
    const desiredPage = parseInt(event.target.value)

    // jika hasilnya bukan angka dikarenakan input invalid,
    // maka kita tidak akan proses menampilkan halaman yang di inginkan
    if (isNaN(desiredPage)) {
        return;
    }

    // tampilkan halaman yang di inginkan
    getCarsPage(desiredPage)
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