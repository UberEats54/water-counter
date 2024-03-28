const totalLabel = document.querySelector("#label");
const waterAdder = document.querySelector("#waterAdder");
const waterLeft = document.querySelector("#waterLeft");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const date = new Date();
d = date.getDay();

let totalWater = parseInt(getCookie('totalWater')) || 0;
const goal = 3000;

if(getCookie('day') != d) totalWater = 0;
console.log(getCookie('day'));
console.log(d);

ctx.fillStyle = 'cyan';
fillBar();

document.querySelector("#plusBtn").addEventListener("click", () =>{
    totalWater += Number(waterAdder.value);
    totalLabel.textContent = totalWater;
    waterLeft.textContent = (goal < Number(totalWater)? "Goal reached!" : (goal - totalWater) + "ml left");
    setCookie('totalWater', Number(totalWater), 1);
    setCookie('day', d, 1);

    fillBar();
});

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