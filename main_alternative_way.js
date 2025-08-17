import { generateReturnsArray } from "./src/investmentGoals.js";

const form = document.getElementById("investment-form");
const calculateButton = document.getElementById("calculate-results");

function renderProgression(event) {
  event.preventDefault();

  const startingAmount = Number(form["starting-amount"].value);
  // const startingAmount = Number(
  //   document.getElementById("starting-amount").value
  // );

  const additionalContributions = Number(
    form["additional-contributions"].value
  );
  // const additionalContributions = Number(
  //   document.getElementById("additional-contributions").value
  // );

  const timeAmount = Number(form["time-amount"].value);
  // const timeAmount = Number(document.getElementById("time-amount").value);

  const timeAmountPeriod = form["const time-amount-period ="].value;
  // const timeAmountPeriod = document.getElementById("time-amount-period").value;

  const returnRate = Number(form["return-rate"].value);
  // const returnRate = Number(document.getElementById("return-rate").value);

  const returnRatePeriod = form["evaluation-period"].value;
  // const returnRatePeriod = document.getElementById("evaluation-period");

  const taxRate = Number(form["tax-rate"].value);
  // const taxRate = Number(document.getElementById("tax-rate").value);

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContributions,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

// form.addEventListener("submit", renderProgression);
calculateButton.addEventListener("click", renderProgression);
