//Total preguntas del juego
const TOTAL_PREGUNTAS = 16;
//Tiempo del juego
const TIEMPO_DEL_JUEGO = 100;
//Estructura para almacenar las preguntas
const bd_juego = [
    {
        id:'A',
        pregunta:"Empresa reconocida que se dedica a los servidores",
        respuesta:"amazon"
    },
    {
        id:'B',
        pregunta:"Término en ingles que hace referencia a una copia de seguridad",
        respuesta:"backup"
    },
    {
        id:'C',
        pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora",
        respuesta:"cache"
    },
    {
        id:'D',
        pregunta:"Archivo que controla los periféricos que se conectan a la computadora",
        respuesta:"driver"
    },
    {
        id:'E',
        pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado",
        respuesta:"encriptar"
    },
    {
        id:'F',
        pregunta:"Famosa red social creado por Mark Zuckerberg",
        respuesta:"facebook"
    },
    {
        id:'G',
        pregunta:"Lenguaje de programación creado por Google",
        respuesta:"go"
    },
    {
        id:'H',
        pregunta:"Lenguaje utilizado para la estructura a las páginas web",
        respuesta:"html"
    },
    {
        id:'I',
        pregunta:"Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos",
        respuesta:"interfaz"
    },
    {
        id:'J',
        pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
        respuesta:"java"
    },
    {
        id:'K',
        pregunta:"Palabra clave para cualquier búsqueda",
        respuesta:"keyword"
    },
    {
        id:'L',
        pregunta:"Framework de código abierto para desarrollar aplicaciones y servicios con PHP",
        respuesta:"laravel"
    },
    {
        id:'M',
        pregunta:"Es el acrónimo de cuatro herramientas: MongoDB, Express, React y NodeJS",
        respuesta:"mern"
    },
    {
        id:'N',
        pregunta:"Contiene N. Es la parte del desarrollo web que se dedica a la parte frontal de un sitio web",
        respuesta:"frontend"
    },
    {
        id:'O',
        pregunta:"Contiene O. Es un sistema operativo móvil de código cerrado desarrollado por Apple",
        respuesta:"ios"
    },
    {
        id:'P',
        pregunta:"Es un lenguaje de programación interpretado del lado del servidor y de uso general",
        respuesta:"php"
    },
]

//Preguntas que ya han sido contestadas. Si están en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta actual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//Botón comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});

//Creamos el círculo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
    numPreguntaActual++;
  //Controlo si he llegado al final de las preguntas, para comenzar de nuevo
    if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
    }

    if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
        while(estadoPreguntas[numPreguntaActual]==1){
        numPreguntaActual++;
        if(numPreguntaActual>=TOTAL_PREGUNTAS){
            numPreguntaActual=0;
        }
        }

    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
    }else{
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

//Detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
    //Detecto si la tecla presionada es ENTER
    if (event.keyCode === 13) {
    if(respuesta.value==""){
        alert("Debe ingresar un valor!!!");
        return;
    }
    //Obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
    }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
    //Controlo si la respuesta es correcta
    if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
        //Alert("Respuesta correcta")
        cantidadAcertadas++;

        //Actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra =  bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    }else{
    //Alert("respuesta incorrecta")
        //Actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra =  bd_juego[numPreguntaActual].id;
        //Quito l clase del estilo de pregunta actual
        document.getElementById(letra).classList.remove("pregunta-actual");
        //Agrego la clase del estilo de pregunta mal respondida
        document.getElementById(letra).classList.add("mal-respondida");
    }
    respuesta.value="";
    cargarPregunta();
}


//Botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
    countdown = setInterval(() => {
        // Restar un segundo al tiempo restante
        timeLeft--;
        // Actualizar el texto del cronómetro con el tiempo restante
        timer.innerText = timeLeft;
        // Si el tiempo llega a 0, detener el cronómetro
        if (timeLeft < 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000);
}

//Muestra la pantalla final
function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = ((cantidadAcertadas*100)/16).toFixed(2) + "% de acierto";
    document.getElementById("pantalla-juego").style.display =  "none";
    document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //Quito las clases de los circulos
    var circulos = document.getElementsByClassName("circle");
    for(i=0;i<circulos.length;i++){
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    respuesta.value=""

    largarTiempo();
    cargarPregunta();
});