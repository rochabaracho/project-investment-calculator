import { generateReturnsArray } from "./src/investmentGoals.js";
import { Chart } from "chart.js/auto";

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContributions = Number(
    document.getElementById("additional-contributions").value.replace(",", ".")
  );
  const timeAmount = Number(
    document.getElementById("time-amount").value.replace(",", ".")
  );
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContributions,
    returnRate,
    returnRatePeriod
  );

  new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  console.log(returnsArray);
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contributions"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  const errorInputContainers = document.querySelectorAll(".error");

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

function validateInput(event) {
  if (event.target.value === "") {
    return;
  }

  // const parentElement = event.target.parentElement;
  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) < 0)
  ) {
    parentElement.classList.add("error");
    const errorParagraphElement = document.createElement("p");
    errorParagraphElement.classList.add("font-bold");
    errorParagraphElement.classList.add("text-red-500");
    errorParagraphElement.innerText =
      "Enter a numeric value greater than zero.";
    grandParentElement.appendChild(errorParagraphElement);
  } else {
    if (parentElement.classList.contains("error")) {
      parentElement.classList.remove("error");
      grandParentElement.querySelector("p").remove();
    }
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
