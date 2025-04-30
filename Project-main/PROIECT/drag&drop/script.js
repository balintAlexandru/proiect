//Selectam parintele principal in care o sa creem motoarele
const enginesWrapper = document.querySelector(".engines");
//Array-ul de motoare pe care o sa le vad initial.
const engines = [
  {
    image: "../images/tf1.jpg",
    pozX: 0,
    pozY: 0,
    isDragging: false,
    combine: 1,
    link: "../wiki/wiki.html",
    linkText: "Motor 1",
  },
  {
    image: "../images/tj1.jpg",
    pozX: 0,
    pozY: 0,
    isDragging: false,
    combine: 0,
    link: "../wiki/wiki.html",
    linkText: "Motor 2",
  },
];
//Obiectul care o sa ne tina minte motoarul pe care pe care o sa il creem in urma combinarilor.
const newEngine = {
  1: {
    image: "../images/hi1.jpg",
    pozX: 0,
    pozY: 0,
    isDragging: false,
    combine: 2,
    link: "../wiki/wiki.html",
    linkText: "Motor 3",
  },
  3: {
    image: "../images/pj1.gif",
    pozX: 0,
    pozY: 0,
    isDragging: false,
    combine: 2,
    link: "../wiki/wiki.html",
    linkText: "Motor 4",
  },
};

//Array-ul care imi memoreaza index-ul motorului miscat
let movedEngines = [];

const createEnginesList = () => {
  for (let i = 0; i < engines.length; i++) {
    const engine = document.createElement('div');
    engine.classList.add('engine')
    engine.style.backgroundImage = `url("${engines[i].image}")`;
    const imgRama = document.createElement('img');
    imgRama.classList.add('rama')
    imgRama.setAttribute("draggable", "false");
    imgRama.src = "./rama.jpg";
    const engineWrapper = document.createElement("div");
    engineWrapper.classList.add("engine-wrapper");
    engineWrapper.classList.add(`engine-${i}`);
    const image = document.createElement("img");
    image.src = engines[i].image;
    image.setAttribute("draggable", "false");
    const link = document.createElement('a');
    link.target = "_blank";
    link.href = engines[i].link;
    link.innerText = engines[i].linkText;
    link.classList.add('engine-link')
    engineWrapper.appendChild(image)
    engine.appendChild(imgRama)
    engine.appendChild(engineWrapper)
    enginesWrapper.appendChild(engine)
    enginesWrapper.appendChild(link)
  }
  setTimeout(() => {
    initMoveEngines();
  }, 500);
};

const initMoveEngines = () => {
  for (let i = 0; i < engines.length; i++) {
    const element = document.querySelector(`.engine-${i}`);
    element.addEventListener("mousedown", function(event) {
      if (movedEngines.length <= 1 || movedEngines.includes(i)) {
        engines[i].isDragging = true;
        engines[i].pozX = event.clientX - element.getBoundingClientRect().left;
        engines[i].pozY = event.clientY - element.getBoundingClientRect().top;
        element.style.position = "absolute";
        console.log("click", engines[i].pozX, engines[i].pozY);
      }
    });
    element.addEventListener("contextmenu", function(event) {
      event.preventDefault();
      element.style.position = "";
      element.style.left = "";
      element.style.top = "";
      engines[i].pozX = 0;
      engines[i].pozY = 0;
    });
    document.addEventListener("mousemove", function(event) {
      if (movedEngines.length <= 1 || movedEngines.includes(i)) {
        if (engines[i].isDragging) {
          element.style.left = event.clientX - engines[i].pozX + "px";
          element.style.top = event.clientY - engines[i].pozX + 50 + "px";
          if (!movedEngines.includes(i)) {
            movedEngines.push(i);
          }
        }
      }
    });
    document.addEventListener("mouseup", function(event) {
      engines[i].isDragging = false;
      if (movedEngines.length === 2) {
        const margin = 40;

        const element1 = document.querySelector(`.engine-${movedEngines[0]}`);
        const element2 = document.querySelector(`.engine-${movedEngines[1]}`);

        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        const isColliding =
          rect1.right >= rect2.left - margin &&
          rect1.left <= rect2.right + margin &&
          rect1.bottom >= rect2.top - margin &&
          rect1.top <= rect2.bottom + margin;

        if (isColliding) {
          const combineEngine =
            engines[movedEngines[0]].combine + engines[movedEngines[1]].combine;
          movedEngines = [];
          setTimeout(() => {
            engines.push(newEngine[combineEngine]);
            enginesWrapper.innerHTML = "";
            createEnginesList();
          }, 200);
        }
      }
    });
  }
};

createEnginesList();

