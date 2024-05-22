const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  console.log(`Guess: ${guess}`);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = "block";
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "block";
    } else {
      tooHighMessage.style.display = "block"; // BUG: change else tooLowMessage to tooHighMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "inline";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    // BUG: changed ==== to ===
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = "";
  }

  guessInput.value = "";
  resetButton.disabled = false; // BUG: changed from true to false
  resetButton.style.display = "";
}

checkGuess();

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    // BUG: removed = from <=
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // BUG: changed funtion to function
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // BUG: changed maxNumberOfAttempts = 0 to attempts = 0

  // Enable the input and submit button
  submitButton.disabled = false; // BUG: changed disabeld to disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.disabled = true;
  resetButton.style.display = "none"; // BUG: added resetButton.style.display = "none" to hide button;
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
