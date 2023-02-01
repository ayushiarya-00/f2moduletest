const registeredData = { name: "", email: "", username: "" };
const registerFormButton = document.getElementById("form-button");
const displayDetailButton = document.getElementById("display-details");
const rollDiceButton = document.getElementById("dice-roll");
const couponButton = document.getElementById("coupon-button");

const registrationForm = document.getElementById("registration-form");
const formContainer = document.getElementById("form-container");
const detailDiceContainer = document.getElementById('detail-dice-container')
const displayContainer = document.getElementById("display-container");
const displayName = document.getElementById("display-name");
const displayUsername = document.getElementById("display-username");
const numberContainer = document.getElementById("number-container");
const diceButton = document.getElementById("dice-button");
const couponGenerator = document.getElementById("couponGenerator");
let coupon = document.getElementById("coupon");
let isUserRegistered = false;
let isImageTwoClicked = false;
let isImageThreeClicked = false;
let numbers = [];
let diceRollAttemptCount = 0;


registerFormButton.addEventListener("click", () => {
  formContainer.style.display = "block";
});

registrationForm.onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  registeredData.name = name;
  registeredData.email = email;
  registeredData.username = username;
  
  isUserRegistered = true;
  registerFormButton.disabled = true
  formContainer.innerHTML = "<h1>Registration Successful!</h1>";
}



displayDetailButton.addEventListener("click", () => {
  if (isUserRegistered) {
    formContainer.style.display = "none";
    detailDiceContainer.style.display = "flex";
    displayName.innerHTML = "Name : " + registeredData.name + " ";
    displayUsername.innerHTML = "Username : " + registeredData.username;
    isImageTwoClicked = true;
    displayDetailButton.disabled = true
  }
  else {
    alert("Please Register First")
  }
});

rollDiceButton.addEventListener("click", () => {
  if (isImageTwoClicked) {
    diceButton.style.display = "block";


  }
  else {
    alert("Please click Image-2 First");
  }
});

diceButton.onclick = () => {
  if (numbers.length < 3) {
    displayContainer.style.display = "block";

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    numbers.push(randomNumber);
    numberContainer.innerHTML = "Number: " + numbers.join(", ");
    numberContainer.classList.add("dice-results");

    if (numbers.length === 3) {
      let sum = 0;
      diceRollAttemptCount++;
      if (diceRollAttemptCount < 2) {
        for (let i = 0; i < numbers.length; i++) {
          sum += numbers[i];
        }
        
        if (sum <= 10) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              alert("Your sum is less than or equal 10, You can try one more time");
            });
          });
          numbers.length = 0;
        }
        else {
          requestAnimationFrame(() => {
            setTimeout(() => {
              alert("SUCCESSFUL! You can click the next image");
            });
          });
          isImageThreeClicked = true;
          rollDiceButton.disabled = true 
          diceRollAttemptCount=0
        }
      }
      else {
        requestAnimationFrame(() => {
          setTimeout(() => {
            alert("Bad Luck! Refresh and Try Again");
          });
        });
        diceRollAttemptCount=0
      }
    }
  }
}

couponButton.addEventListener("click", () => {
  if (isImageThreeClicked) {
    detailDiceContainer.style.display="none";
    couponGenerator.style.display="block";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let couponCode = "";

    for (let i = 0; i < 12; i++) {
      couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    coupon.style.display = "block";
    coupon.innerHTML = couponCode;
    couponButton.disabled = true;
  }
  else {
    alert("Click on Image-3 first");
  }
});



