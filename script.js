const choix = document.querySelector(".choix");
const span = document.querySelectorAll(".span-1");
const choixBouton = document.getElementById("boutonChoix");
let tableau = [];

const spanVide = document.querySelector(".vide");
const msgFin = document.querySelector("h3");

let tableCode = [
  "A40S19",
  "E7JFU3",
  "MCC1L9",
  "SX11RL",
  "5LAS45",
  "W745F2",
  "GJL323",
  "C321ED",
  "IU8A74",
  "Z7XBV9",
];

boutonChoix.addEventListener("click", () => {

  choix.classList.add("addColorChoix");
  boutonChoix.classList.add("addClassButton");
  choixBouton.setAttribute("disabled", "off");
  autoPlay();
  numberChoice();
  audio("clic.mp3");
});

function storage(t) {
  window.localStorage.localTable = JSON.stringify(t);
  return window.localStorage.localTable
}

function getStorage() {
  let ndate = window.localStorage.localTable;
  if (!ndate) {
    storage(tableau)
  } else {
    tableau = JSON.parse(ndate);
  }
}

getStorage();

/*-------------------------------------------------*/
const autoPlay = () => {
  setTimeout(() => {
    boutonChoix.classList.toggle("addClassButton");
    choixBouton.removeAttribute("disabled");
  }, 100);
};

const audio = (lien) => {
  let lecteur = new Audio();
  lecteur.src = `./${lien}`;
  lecteur.play();
};

const numberChoice = () => {
  let cul = Math.floor(Math.random() * 10) + 1;
  if (tableau.length === 10) {
    msgFin.textContent = "FIN DE TIRAGE !";
    msgFin.style.color = "tomato";
    setTimeout(() => {
      choix.textContent = "Merci !";
      choix.style.color = "white";
    }, 100);
    return;
  } else {
    span.forEach((element) => {
      if (cul === parseInt(element.id)) {
        element.classList.add("addClassSpan");
        element.textContent = "ok";
        if (tableau.includes(cul)) {
          numberChoice();
        } else {
          choix.textContent = cul;
          tableau[tableau.length] = cul;
          storage(tableau);
        }
      }
    });
  }
};


const getDate = document.getElementById("date");
getDate.value = new Date().toISOString().split("T")[0];


function addClass() {
  span.forEach((element) => {
    let tably = JSON.parse(storage(tableau));
    tably.forEach((u) => {
      if (u === parseInt(element.id)) {
        element.classList.add("addClassSpan");
        element.textContent = "ok";
        spanVide.innerHTML += `<li>${u}</li>`;
      }
    })
  })
};

addClass();
function reload() {
  document.location.reload();
};


function numerotation() {
  let i = 0

};

// numerotation();