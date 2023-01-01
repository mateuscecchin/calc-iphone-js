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

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    handleEvent(event);
  });
});
