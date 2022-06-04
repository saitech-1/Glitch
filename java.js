const quoteApiUrl = "https://api.quotable.io/random?minLength=150&maxLength=300";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

console.log(quoteSection, userInput);
let quote ="";
let time = 60;
let timer = "";
let mistakes = 0;

const renderNewQuote = async () => {
   const response = await fetch(quoteApiUrl);

   let data = await response.json();

   quote = data.content;

   console.log(data.content);

   let arr = quote.split("").map((value) =>{
      return "<span class='quote-chars'>" + value + "</span>";
   });
   quoteSection.innerHTML += arr.join("");
};

//logic to compare
userInput.addEventListener("input", () => {
   let quoteChars = document.querySelectorAll(".quote-chars");
   //create an array from received span tags 
   quoteChars = Array.from(quoteChars);
   
   //arrays user input
   let userInputChars = userInput.value.split("");

   //loop through the end fo quote
   quoteChars.forEach((char, index) => {
      if (char.innerText == userInputChars[index]) {
         char.classList.add("success");
      }

   else if(userInputChars[index]== null){
      if(char.classList.contains("success")){
         char.classList.remove("success");
      }
      else {
         char.classList.remove("fail");
      }
   }

   else { 
      if (!char.classList.contains("fail")) {
         mistakes += 1;
         char.classList.add("fail");
      } 
      document.getElementById("mistakes").innerText = mistakes;
   }
   let check = quoteChars.every(element=>{
      return element.classList.contains("success");
   });
   if (check) {
      displayResult();
   }
   });
});

function updateTimer(){
   if(time == 0){
      displayResult();
   }
   else {
      document.getElementById("timer").innerText = --time + "s";
   }
}

const timeReduce = () => {
   time = 60;
   timer = setInterval(updateTimer, 1000);
};

//end test
const displayResult = () => {
   document.querySelector(".result").style.display = "block";
   clearInterval(timer);
   document.getElementById("stop-test").style.display = "none";
   userInput.disabled = true;
   let timeTaken = 1;
   if (time != 0) {
      timeTaken = (60 - time) / 100;
   }
   document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2)  + " wpm";
   document.getElementById("accuary").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100 
   ) + "%";
};

//start-test
const startTest = () => {
   mistakes = 0;
   timer = "";
   userInput.disabled = false;
   timeReduce();
   document.getElementById("start-test").style.display = "none";
   document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
   userInput.value = "";
   document.getElementById("start-test").style.display = "block";
   document.getElementById("stop-test").style.display = "none";
   userInput.disabled = true;
   renderNewQuote();
};

