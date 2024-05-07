const hero = document.querySelector(".hero");
const colorButton = document.querySelector(".color-button");
const background = [
  {
    color: "#011627", // Purple color
    writeup1: "Without secure APIs, rapid innovation would be impossible",
    writeup2: "Get your APIs Scanned to avoid business downtime",
  },
  {
    color: "rgb(0, 0, 43)", // Darker blue
    writeup1: "Without secure APIs, rapid innovation would be impossible",
    writeup2: "Get your APIs Scanned to avoid business downtime",
  },
  {
    color: "rgb(96, 34, 12)", // Dark Orange
    writeup1: "Without secure APIs, rapid innovation would be impossible",
    writeup2: "Get your APIs Scanned to avoid business downtime",
  },
  {
    color: "#011627", // Darker gray
    writeup1: "Without secure APIs, rapid innovation would be impossible",
    writeup2: "Get your APIs Scanned to avoid business downtime",
  },
  {
    color: "rgb(27, 1, 27)", // Dark Purple
    writeup1: "Without secure APIs, rapid innovation would be impossible",
    writeup2: "Get your APIs Scanned to avoid business downtime",
  },
];

let currentIndex = 0;

function changeBackgrounColor() {
  const currentColor = background[currentIndex];
  hero.style.background = currentColor.color;
  const writeupElement1 = document.querySelector(".hero-heading");
  writeupElement1.innerHTML = currentColor.writeup1;
  const writeupElement2 = document.querySelector(".hero-paragraph");
  writeupElement2.innerHTML = currentColor.writeup2;
  currentIndex = (currentIndex + 1) % background.length;
}
function changeButtonColor() {
  const currentColor = background[currentIndex];
  colorButton.style.background = currentColor.color;
  currentIndex = (currentIndex + 1) % background.length;
}

changeBackgrounColor();
changeButtonColor;

setInterval(changeBackgrounColor, 8000);
setInterval(changeButtonColor, 7000);
