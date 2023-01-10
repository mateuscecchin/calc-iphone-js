const currentValue = document.querySelector(".calc-current-value");
const buttons = document.querySelectorAll(".calc-btn-container button");
const buttonsOperation = document.querySelectorAll(".calc-btn-operation");

const operationScheme = ["/", "x", "-", "+"];
const functionScheme = ["C", "+/-", "%"];
let operation = "";
let oldCurrentValue = 0;
let canNewCurrentValue = false;

function resetCalculator() {
  oldCurrentValue = 0;
  buttonsOperation.forEach(
    (e) => e.innerHTML === operation && (e.classList = "calc-btn-operation")
  );
  operation = "";
}

function handleCurrentValue(value) {
  if (canNewCurrentValue === true) {
    currentValue.innerText = 0;
    canNewCurrentValue = false;
  }
  if (value === "." && currentValue.innerText.includes(".")) {
    return;
  } else if (
    value === "0" &&
    currentValue.innerText[0] === 0 &&
    currentValue.innerText.length === 1
  ) {
    return;
  } else if (currentValue.innerText.length > 9) {
    return;
  } else if (currentValue.innerText.length > 0) {
    buttons.forEach((e) => e.innerText === "AC" && (e.innerText = "C"));
    if (currentValue.innerText == 0) {
      currentValue.innerText = value;
    } else {
      currentValue.innerText += value;
    }
  }
}

function handleFunctions(digit) {
  switch (digit) {
    case "C":
      if (currentValue.innerText === 0 && operation !== "") {
        resetCalculator();
      }
      currentValue.innerText = 0;
      buttons.forEach((e) => (e.innerText === "C" ? (e.innerText = "AC") : "C"));
      break;
    case "+/-":
      if (currentValue.innerText.startsWith("-")) {
        currentValue.innerText = currentValue.innerText.replace("-", "");
      } else {
        currentValue.innerText = "-" + currentValue.innerText;
      }
      break;
    case "%":
      if (currentValue.innerText.length > 9) {
        return;
      }
      currentValue.innerText = +currentValue.innerText / 100;
      break;

    default:
      break;
  }
}

function handleOperations(valueText) {
  operation = valueText;
  buttonsOperation.forEach((e) =>
    e.innerHTML === operation
      ? (e.classList = "calc-btn-operation-selected")
      : (e.classList = "calc-btn-operation")
  );
  canNewCurrentValue = true;
  oldCurrentValue = currentValue.innerText;
}

function handleCalculus() {
  let calculateNumber;

  switch (operation) {
    case "x":
      calculateNumber = +oldCurrentValue * +currentValue.innerText;
      break;
    case "/":
      calculateNumber = +oldCurrentValue / +currentValue.innerText;
      break;
    case "-":
      calculateNumber = +oldCurrentValue - +currentValue.innerText;
      break;
    case "+":
      calculateNumber = +oldCurrentValue + +currentValue.innerText;
      break;
    default:
      return;
  }

  if (calculateNumber.length > 9) {
    calculateNumber.toExponential();
  }

  currentValue.innerText = calculateNumber;

  resetCalculator();
}

function handleEvent(event) {
  const digit = event.target.innerText;

  if (+digit >= 0 || digit === ".") {
    handleCurrentValue(digit);
  } else if (functionScheme.includes(digit)) {
    handleFunctions(digit);
  } else if (operationScheme.includes(digit)) {
    handleOperations(digit);
  } else if ("=" === digit) {
    handleCalculus();
  }
}

/**
 * Handles any keyboard key press events, by clicking in the corresponded
 * calculator button at the page.
 *
 * Below is a cheat sheet for the keys:
 *
 *   + `any number`: press the corresponded button with that number.
 *   + `c`: press the clear button.
 *   + `)`: press the plus and minus button.
 *   + `%`: press the percentage button.
 *   + `/`: press the division button.
 *   + `x` or `*`: press the multiplication button.
 *   + `-`: press the minus button.
 *   + `+`: press the plus button.
 *   + `.` or `,`: press the dot button.
 *   + `Enter` or `=`: press the equal button.
 *
 * @param {KeyEvent} keyEvent The key event to be handled.
 */
function handleKeyboard(keyEvent) {
  const { key } = keyEvent;

  // If the key pressed is a number, the corresponded element with that number
  // in the page receives a click event.
  if (!isNaN(key)) {
    const [numberButton] = Array.from(
        document.querySelectorAll('.calc-btn-number')
    ).filter((buttonElement) => { return buttonElement.innerHTML === key });
    numberButton.click();
    return;
  }

  // If the key pressed is not a number, a set of if blocks will handle each
  // other acceptable key.
  if (key === 'c') {
    const acButton = document.querySelector('[data-button="ac-button"]');
    acButton.click();
  } else if (key === ')') {
    const plusAndMinusButton =
        document.querySelector('[data-button="plus-and-minus-button"]');
    plusAndMinusButton.click();
  } else if (key === '%') {
    const percentageButton =
        document.querySelector('[data-button="percentage-button"]');
    percentageButton.click();
  } else if (key === '/') {
    // Prevents the search action in Firefox when the `/` key is pressed.
    keyEvent.preventDefault();

    const divisionButton =
        document.querySelector('[data-button="division-button"]');
    divisionButton.click();
  } else if (key === 'x' || key === '*') {
    const multiplicationButton =
        document.querySelector('[data-button="multiplication-button"]');
    multiplicationButton.click();
  } else if (key === '-') {
    const minusButton = document.querySelector('[data-button="minus-button"]');
    minusButton.click();
  } else if (key === '+') {
    const plusButton = document.querySelector('[data-button="plus-button"]');
    plusButton.click();
  } else if (key === '.' || key === ',') {
    const dotButton = document.querySelector('[data-button="dot-button"]');
    dotButton.click();
  } else if (key === 'Enter' || key === '=') {
    const equalButton = document.querySelector('[data-button="equal-button"]');
    equalButton.click();
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    handleEvent(event);
  });
});

document.addEventListener('keypress', handleKeyboard);

