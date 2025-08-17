import { generateReturnsArray } from "./src/investmentGoals.js";

const calculateButton = document.getElementById("calculate-results");

function renderProgression() {
  const startingAmount = Number(
    document.getElementById("starting-amount").value
  );
  const additionalContributions = Number(
    document.getElementById("additional-contributions").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const returnRatePeriod = document.getElementById("evaluation-period");
  const taxRate = Number(document.getElementById("tax-rate").value);

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

calculateButton.addEventListener("click", renderProgression);
