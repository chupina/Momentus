// DOM Elements
const body = document.querySelector("body");
const time = document.querySelector(".time");
const day = document.querySelector(".day");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const focusHeader = document.querySelector(".focusHeader");
const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const todoBtn = document.querySelector("#todoBtn");

const monthNames = [ "January","February",
  "March","April","May","June","July","August","September","October","November","December",];

const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

const images=["09.jpg","10.jpg","11.jpg","12.jpg",
"13.jpg","14.jpg","15.jpg","16.jpg", "17.jpg","18.jpg","19.jpg","20.jpg",];


const background = {
  init(){
    btn.addEventListener("click", this.setBgGreet.bind(background));
  },
  //assign button
 viewBgImage(src) {
   const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
  body.style.backgroundImage = `url(${src})`;
  };
  },
getImage(baseUrl) {
  let base = baseUrl;
 let i = Math.floor(Math.random() * 10);
  const index = i % images.length;
  const imageSrc = base + images[index];
  this.viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 1000)},
  setBgGreet(){
    let today = new Date(),
      hour = today.getHours(),
      month = today.getMonth(),
       date = today.getDate();
      if (hour < 12) {
      // Morning
      this.getImage("./assets/images/morning/");
      greeting.textContent = "Good Morning, ";
    } else if (hour < 18) {
      // Afternoon
      this.getImage("./assets/images/day/");
      greeting.textContent = "Good Afternoon, ";
    } else if (hour < 21) {
      // Evening
      this.getImage("./assets/images/evening/");
      greeting.textContent = "Good Evening, ";
      document.body.style.color = "rgb(255, 255, 255)";
    } else {
      // Night
     this.getImage("./assets/images/night/");
      greeting.textContent = "Good Night, ";
      document.body.style.color = "rgb(255, 255, 255)";
    }
       if(month==1 && date==22){
       background.viewBgImage("./assets/images/birthday/07.jpg");
       greeting.textContent = 'Happy Birthday,';
     }
  }

}


const timer = {

currentHour:null,
hour:null,
min:null,
sec:null,
month:null,
weekday:null,
date:null,

setTime(){
 let now = new Date();
  this.hour = now.getHours(),
  this.min = now.getMinutes(),
  this.sec = now.getSeconds(),
  this.month = now.getMonth(),
  this.weekday = now.getDay(),
  this.date = now.getDate(); 
},
checkTime(){
  this.setTime();
  if (!(this.currentHour === this.hour)) {
  this.currentHour = this.hour;
  background.setBgGreet();
  }
},
addZero(n){
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
},
 showTime:function(){
  this.checkTime();
  
  time.innerHTML = `${this.hour}<span>:</span>${this.addZero(this.min)}<span>:</span>${this.addZero(this.sec)} `;
  day.innerHTML = `${dayNames[this.weekday]}<span>, &nbsp;</span>${monthNames[this.month]}<span>&nbsp;</span>${this.date} `;
  },
init:function(){
  this.setTime();
  setInterval(this.showTime.bind(timer), 1000);
}
}





 

// Set Background and Greeting


// Get Name
function getName() {
  if (!localStorage.getItem("name")) {
    name.textContent = "{Please, enter your name here}";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      } else {
        getName();
        name.blur();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    } else {
      getName();
      name.blur();
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focusHeader.textContent = 'Enter your focus for today';
    focus.textContent = "[Enter Focus]";
  } else {
    focusHeader.textContent = 'Today focus';
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      } else {
        getFocus();
        focus.blur();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem("focus", e.target.innerText);
    } else {
      getFocus();
    }
  }
}

// Get Location
function getLocation() {
  if (localStorage.getItem("city") === null) {
    city.textContent = "[Enter Your City]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}

// Set Location
function setLocation(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText) {
        localStorage.setItem("city", e.target.innerText);
       getWeather();
        city.blur();
      } else {
        getLocation();

        city.blur();
      }
    }
  } else {
    if (e.target.innerText) {
      localStorage.setItem("city", e.target.innerText);

      city.blur();
    } else {
      getLocation();
      city.blur();
    }
  }
}

//ClearTextArea
function clearTextArea(e) {
  e.target.innerText = "";
}

async function getWeather(){
  try{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=6d09e9fe92e973e2e675bcff23c04d8a&units=metric`;
  const res = await fetch(url);
 const data = await res.json();
 console.log(data);

weatherIcon.className = 'weather-icon owf-3x owf';
weatherIcon.classList.add(`owf-${data.weather[0].id}`);
temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
weatherDescription.textContent = data.weather[0].description;
//weatherHumidity.textContent = `humidity: ${data.main.humidity}%`;
//weatherWind.textContent =`wind: ${data.wind.speed}m/s   ` ;


}catch{
      //alert('Unable to load weather data, please enter another city or try again later');
      city.textContent = "Please, enter the City ";
      temperature.textContent = '';
      weatherDescription.textContent = '';
      //weatherHumidity.textContent = '';
      //weatherWind.textContent ='' ;
      localStorage.removeItem('city');
      city.blur();
    }
}

async function getQuote() {  

const url = `https://type.fit/api/quotes`;
try{
  const res = await fetch(url);
const data = await res.json(); 
const todayQuote = (data[Math.floor(Math.random()*1000)]);
blockquote.textContent = todayQuote.text;
figcaption.textContent = todayQuote.author; 
}catch{
  blockquote.textContent ='Have a woooooownderful day';
}

}



name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("focus", clearTextArea);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("focus", clearTextArea);
city.addEventListener("keypress", setLocation);
city.addEventListener("blur", setLocation);
city.addEventListener("focus", clearTextArea);
btn2.addEventListener("click", getQuote);
// Run
timer.init();
background.init();
//setBgGreet();
getName();
getFocus();
getLocation();

document.addEventListener("DOMContentLoaded", getQuote);
document.addEventListener("DOMContentLoaded", getWeather);





// onkeyup event
todoBtn.onclick = ()=>{
  document.getElementById("todo").classList.toggle('hidden');
 
}
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active");
  }else{
    addBtn.classList.remove("active");
  }
}
 showTasks();
 
addBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
  addBtn.classList.remove("active");
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><span class="material-icons">delete</span></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}



var swiper = new Swiper('.swiper-container', {
  effect: 'cube',
  grabCursor: true,
  loop: true,
  autoHeight: true,
  cubeEffect: {
  shadow: true,
  slideShadows: true,
  shadowOffset: 20,
  shadowScale: 0.94,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 60000,
    disableOnInteraction: false,
  },
});