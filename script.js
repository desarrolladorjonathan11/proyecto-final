class Alumno {
    constructor(nombre, descripcion) {
        this.nombre = nombre
        this.descripcion = descripcion
    }
}

let alumnos = []

if (localStorage.getItem('alumnos')) {
    alumnos = JSON.parse(localStorage.getItem('alumnos'))
} else {
    localStorage.setItem('alumnos', JSON.stringify(alumnos))
}

const formAlumnos = document.getElementById("formAlumnos")
const divAlumnos = document.getElementById("divAlumnos")
const botonAlumnos = document.getElementById("botonAlumnos")

formAlumnos.addEventListener('submit', (e) => {
    e.preventDefault(e.target)
    let datForm = new FormData(e.target)

    console.log(datForm.get('nombre'), datForm.get('descripcion'))

    const alumno = new Alumno(datForm.get('nombre'), datForm.get('descripcion'))

    alumnos.push(alumno)

    console.log(alumnos)
    localStorage.setItem('alumnos', JSON.stringify(alumnos))
    formAlumnos.reset()
})

botonAlumnos.addEventListener('click', () => {
    let arrayStorage = JSON.parse(localStorage.getItem('alumnos'))
    divAlumnos.innerHTML = ""
    arrayStorage.forEach((alumno, indice) => {
        divAlumnos.innerHTML += `
        <div class="card text-white bg-primary mb-3" id="alumno${indice}" style="max-width: 20rem; margin:4px">
        <div class="card-header"><h2>${alumno.nombre}</h2></div>
        <div class="card-body">
            <p class="card-title">${alumno.descripcion}</p>
            <button class="btn btn-danger">Eliminar alumno</button>
        </div>
    </div>
    `
    });

    arrayStorage.forEach((alumno, indice) => {
        let botonCard = document.getElementById(`alumno${indice}`).lastElementChild.lastElementChild
        botonCard.addEventListener('click', () => {
            document.getElementById(`alumno${indice}`).remove()
            alumnos.splice(indice, 1)
            localStorage.setItem('alumnos', JSON.stringify(alumnos))
            console.log(`${alumno.nombre} Eliminado`)
        })
    })
})

const botoncorrecto = document.getElementById("botoncorrecto")
botoncorrecto.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su Usuario ha sido creado Correctamente',
        showConfirmButton: false,
        timer: 1500
    })
})