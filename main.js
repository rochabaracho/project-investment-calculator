import { generateReturnsArray } from "./src/investmentGoals.js";
import { Chart } from "chart.js/auto";

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");

let doughnutChartReference = {};
let stackedBarChartReference = {};

const columnsArray = [
  { columnLabel: "Total Invested", accessor: "investedAmouint" },
  { columnLabel: "Monthly Profitably", accessor: "interestReturns" },
  { columnLabel: "Total Profitably", accessor: "totalInterestReturns" },
  { columnLabel: "month", accessor: "moth" },
  { columnLabel: "Total Amount", accessor: "totalAmount" },
];

function formatCurrency(value) {
  // return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return value.toFixed(2);
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(stackedBarChartReference)
  ) {
    doughnutChartReference.destroy();
    stackedBarChartReference.destroy();
  }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contributions"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();

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

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  resetCharts();
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

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  const dataChart = [
    formatCurrency(finalInvestmentObject.investedAmount),
    formatCurrency(
      finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
    ),
    formatCurrency(
      finalInvestmentObject.totalInterestReturns * (taxRate / 100)
    ),
  ];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Invested", "Income", "Tax"],
      datasets: [
        {
          data: [dataChart[0], dataChart[1], dataChart[2]],
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

  stackedBarChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investment",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Investment Profitability",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  console.log(returnsArray);
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

// form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
