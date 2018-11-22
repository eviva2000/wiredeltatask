"use strict";
let body = document.querySelector("body");
let date = new Date();
let btn = document.querySelector("#btn");
console.log(date);
let dayName;
let temp1 = document.querySelector("#description").content;
let temp2 = document.querySelector("#time").content;
let temp3 = document.querySelector("#description1").content;
let temp4 = document.querySelector("#time1").content;
// making two columns of the table as parents(containers)for our dynamic data
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let p4 = document.querySelector("#p4");
let day = date.getDay();
let tomorrow = day + 1;
let tomorrowName;
let tomorrowBtn = document.getElementById("tomorrow");
let newTable = document.querySelector(".second");

// getting date
function todaysDate() {
  let month = date.getMonth();
  let year = date.getFullYear();
  let numberOfDay = date.getDate();
  let months = [
    "Januray",
    "February",
    " March",
    "April",
    " May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  dayName = weekday[day];
  tomorrowName = weekday[tomorrow];
  let monthName = months[month];
  document.getElementById(
    "day"
  ).innerHTML = `${dayName} ${numberOfDay}th ${monthName} ${year}`;
}

// getting hour
function currentTime() {
  let hr = date.getHours();
  let min = date.getMinutes();
  let suffix;

  if (hr >= 12) {
    suffix = "PM";
    hr = hr - 12;
  } else {
    if (hr < 12) {
      console.log("hi");
      suffix = "AM";
    }
  }
  document.querySelector("#timewrapper").innerHTML = `${hr}:${min} ${suffix}`;
}

//grabbing data from local json file
function fetchData() {
  const url = "tasks.json";

  fetch(url)
    .then(res => res.json())
    .then(data => allTasks(data));
}

function allTasks(data) {
  data.forEach(task => {
    showSingleTask(task);
  });
}
function showSingleTask(task) {
  // creating 2 separate clone for description and time
  let clone1 = temp1.cloneNode(true);
  let clone2 = temp2.cloneNode(true);
  let clone3 = temp3.cloneNode(true);
  let clone4 = temp4.cloneNode(true);
  let name = task.day;
  // check the day
  if (name === dayName) {
    console.log(name);
    clone1.querySelector("#des").textContent = task.description;
    clone2.querySelector("#when").textContent = task.time;
    // append day`s task and time to their separate parents
    p1.appendChild(clone1);
    p2.appendChild(clone2);
  }
  if (name === tomorrowName) {
    clone3.querySelector("#des1").textContent = task.description;
    clone4.querySelector("#when1").textContent = task.time;
    // append day`s task and time to their separate parents
    p3.appendChild(clone3);
    p4.appendChild(clone4);
  }
}
// changing title and background color

function changingTheTitle() {
  let updateForm = document.querySelector("form");
  let btn = document.querySelector("#newtitle");
  updateForm.addEventListener("submit", e => {
    e.preventDefault();
    let newTitle = document.querySelector("#newtitle").value;
    console.log(newTitle);
    document.querySelector("header h1").innerHTML = newTitle;
  });
}

function changingTheBackground() {
  let color = document.getElementById("mySelect").value;
  console.log(color);
  body.style.backgroundColor = `${color}`;
}

// adding eventlistener to show tomorrow tasks
tomorrowBtn.addEventListener("click", showTomorrowTasks);
function showTomorrowTasks() {
  newTable.classList.add("animateme");
}

todaysDate();
currentTime();
fetchData();
changingTheTitle();
changingTheBackground();
