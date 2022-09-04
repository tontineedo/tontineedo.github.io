const choix = document.querySelector(".choix");
const span = document.querySelectorAll(".span-1");
const choixBouton = document.getElementById("boutonChoix");
let tableau = [];
let tHour = [];
let n = 0;

const spanVide = document.querySelector(".maclasse");
const msgFin = document.querySelector("h3");

if(window.localStorage.localTable){
  localStorage.clear()
}

const memberList = [
  {nom : "Jeremie", code : "A40S19", sex : "M", numero : 1},
  {nom : "Mme Edwige", code : "DFJK77", sex : "F", numero : 1},
  {nom : "Mr BOKINI 1", code : "E7JFU3", sex : "M", numero : 2},
  {nom : "Mr BOKINI 2", code : "MCC1L9", sex : "M", numero : 3},
  {nom : "Mr Richard", code : "W745F2", sex : "M", numero : 4},
  {nom : "Mme Edwige", code : "SX11RL", sex : "F", numero : 5},
  {nom : "Mr Georges", code : "C321ED", sex : "M", numero : 5},
  {nom : "Pere Évariste", code : "5LAS45", sex : "M", numero : 6} ,
  {nom : "Mme Yemissi", code : "GJL323", sex : "M", numero : 7},
  {nom : "Mme Mellique", code : "BB02HJ", sex : "F", numero : 7},
  {nom : "Mr Moise", code : "125MM7", sex : "M", numero : 8},
  {nom : "Mme Fanny", code : "OL7814", sex : "F", numero : 8},
  {nom : "Mme Hortense", code : "SS02JK", sex : "M", numero : 9},
  {nom : "Mr Georges", code : "Z7XBV9", sex : "M", numero : 10}
]  

const getDate = document.getElementById("date");
getDate.value = new Date().toISOString().split("T")[0];

let choixCode = prompt("Veuillez taper votre code : ")
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
    numberChoice();
  });
  
  function storage(t) {
    window.localStorage.localValue = JSON.stringify(t);
    return window.localStorage.localValue
  }
  
  /*-------------------------------------------------*/
  
  const audio = (lien) => {
    let lecteur = new Audio();
    lecteur.src = `./${lien}`;
    lecteur.play();
  };
  
  const numberChoice = () => {
    let cul = notreChoix();
    if (window.localStorage.localValue) {

      spanVide.classList.add("addvide")
      spanVide.innerHTML =  `<p>Vous avez déja fait un choix<p/>`
      msgFin.textContent = "LE TIRAGE NE SE FAIT QU'UNE SEULE FOIS !";
      msgFin.style.color = "tomato";
      setTimeout(() => {
        choix.textContent = "merci !";
        choix.style.color = "white";
        boutonChoix.setAttribute('disabled', 'off')
      }, 100);
      return;
    } else {
      span.forEach((element) => {
        if (cul === parseInt(element.id)) {
          boutonChoix.setAttribute('disabled', 'off')
          if (tableau.includes(cul)) {
            return;
          } else {
            let p = setInterval(() => {
              let rand = Math.ceil(Math.random() * 10)
              choix.innerHTML = rand;
              n++;
              if(n===50){
                clearInterval(p)
              }
            }, 40);
          

            setTimeout(() => {
              n = 1;
              choix.textContent = cul;
              element.textContent = "ok";
              element.classList.add("addClassSpan");
              tableau[tableau.length] = cul;
              storage(tableau);
              boutonChoix.innerHTML = "MERCI POUR VOTRE CHOIX"
              spanVide.classList.add("addvide")
              spanVide.innerHTML = "<p>BRAVO!!! VOUS AVEZ CHOISI LE NUMERO <p/>" + cul;
            }, 2000);
          }
        }
      });
    }
  };
  
}


memberList.map((element) => {
  if(element.code == choixCode){
    App();
  }
})

spanVide.innerHTML = "<p>SOYEZ LA BIENVENUE<p/>"
spanVide.classList.add("addvide")
boutonChoix.removeAttribute('disabled')
boutonChoix.innerHTML = "TIREZ VOTRE NUMERO"  





