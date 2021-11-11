const choix = document.querySelector(".choix");
const span = document.querySelectorAll(".span-1");
const choixBouton = document.getElementById("boutonChoix");
let tableau = [];
let tHour = [];

const spanVide = document.querySelector(".maclasse");
const msgFin = document.querySelector("h3");

const memberList = [
  {nom : "Mr Barma", code : "A40S19", sex : "M", numero : 1},
  {nom : "Mme Edwige", code : "A40S19", sex : "F", numero : 1},
  {nom : "Mr BOKINI 1", code : "E7JFU3", sex : "M", numero : 2},
  {nom : "Mr BOKINI 2", code : "MCC1L9", sex : "M", numero : 3},
  {nom : "Mme Mellique", code : "SX11RL", sex : "F", numero : 5},
  {nom : "Mr Jérémie", code : "5LAS45", sex : "M", numero : 8},
  {nom : "Mr Moise", code : "W745F2", sex : "M", numero : 10},
  {nom : "Mr Aristide", code : "GJL323", sex : "M", numero : 7},
  {nom : "Mr Constantin", code : "GJL323", sex : "M", numero : 7},
  {nom : "Mr Bienvenu", code : "Z7XBV9", sex : "M", numero : 4},
  {nom : "Mr Richard", code : "W745F2", sex : "M", numero : 10},
  {nom : "Mr Georges", code : "C321ED", sex : "M", numero : 9},
  {nom : "Mme Fanny", code : "OU3AR4", sex : "F", numero : 6},
  {nom : "Mademoiselle TÉVOÉDJRE ", code : "OU3AR4", sex : "F", numero : 6},
  {nom : "Mr Évariste", code : "5LAS45", sex : "M", numero : 8}  
]


const init = {
  method : "POST",
  headers : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    pseudo : "Dolus",
    message : "Juste un exercice"
  }),
  mode : "cors",
  Credentials : "same-origin",
}

const getDate = document.getElementById("date");
getDate.value = new Date().toISOString().split("T")[0];

const choixCode = prompt("Merci d'entrer votre code : ");
let nTab = []

memberList.map((element) => {
  nTab.push(element.code)
})

const notreChoix = () => {
  let numeroMembre = 0;
    memberList.map((element) => {
      if(choixCode === element.code){
        numeroMembre = element.numero;
      }
    })

  return numeroMembre;
}

function App () {
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
      localStorage.clear();
      tableau = JSON.parse(ndate);
    }
  }

  function getStor(){
    let ndate = window.localStorage.localHour;
    if (!ndate) {
      storage(tHour)
    } else {
      tHour = JSON.parse(ndate);
    }
  }
  
  getStorage();
  getStor();
  
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
    let cul = notreChoix();
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
            return;
          } else {
            choix.textContent = cul;
            tableau[tableau.length] = cul;
            storage(tableau);
            boutonChoix.innerHTML = "MERCI POUR VOTRE CHOIX"
            
            spanVide.classList.add("addvide")
            spanVide.innerHTML = "<p>BRAVO!!! VOUS AVEZ CHOISI LE NUMERO <p/>" + cul;
          }
        }
      });
    }
  };
  
  
  function addClass() {
    span.forEach((element) => {
      let tably = JSON.parse(storage(tableau));
      tably.forEach((u) => {
        if (u === parseInt(element.id)) {
          element.classList.add("addClassSpan");
          element.textContent = "ok";
          spanVide.innerHTML += ``;
        }
      })
    })
  };
}


if(choixCode){
  if(nTab.includes(choixCode)){
      spanVide.classList.add("addvide")
      spanVide.innerHTML = "<p>Vérification de code réussie !<p/>"
    setTimeout(() => {
      spanVide.classList.remove("addvide")
      spanVide.innerHTML = "";
    }, 2000)
    App()
    boutonChoix.innerHTML = "TIREZ VOTRE NUMERO "
  }else{
    window.alert("CODE INVALIDE")
    boutonChoix.setAttribute("disabled", "off")
  }
}
