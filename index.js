const totalLabel = document.querySelector("#label");
const waterAdder = document.querySelector("#waterAdder");
const waterLeft = document.querySelector("#waterLeft");
const goalLabel = document.querySelector("#goalS");
const sliderCount = document.querySelector("#sliderCount");
const slider = document.querySelector("#slider");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const date = new Date();
d = date.getDay();

let totalWater = parseInt(getCookie('totalWater')) || 0;
let goal = parseInt(getCookie('goal')) || 3000;
goalLabel.textContent = goal;

if(getCookie('day') != d) totalWater = 0;
console.log(getCookie('day'));

ctx.fillStyle = 'cyan';
fillBar();

setInterval(updateSlider, 10);

document.querySelector("#plusBtn").addEventListener("click", () =>{
    totalWater += Number(waterAdder.value);
    totalLabel.textContent = totalWater;
    waterLeft.textContent = (goal < Number(totalWater)? "Goal reached!" : (goal - totalWater) + "ml left");
    setCookie('totalWater', Number(totalWater), 1);
    setCookie('day', d, 1);

    fillBar();
});

document.querySelector("#setBtn").addEventListener("click", () =>{
  goal = slider.value;
  goalLabel.textContent = goal;
  setCookie('goal', goal, 365);
  fillBar();
})

function updateSlider(){
  sliderCount.textContent = slider.value;
}

function fillBar(){
  totalLabel.textContent = totalWater;
  waterLeft.textContent = (goal < Number(totalWater)? "Goal reached!" : (goal - totalWater) + "ml left");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, (totalWater / goal) * canvas.width, canvas.height);
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
