// Global variables
const ageCalcContent = document.querySelector(".age-calc");

const inputsBox = document.querySelector("#input-box");
const inputDaySection = document.querySelector("#input-day-section");
const inputMonthSection = document.querySelector("#input-month-section");
const inputYearSection = document.querySelector("#input-year-section");
const inputDayTitle = document.querySelector("#input-day-title");
const inputMonthTitle = document.querySelector("#input-month-title");
const inputYearTitle = document.querySelector("#input-year-title");
const inputDay = document.querySelector("#input-day");
const inputMonth = document.querySelector("#input-month");
const inputYear = document.querySelector("#input-year");

const currentDate = new Date();

const allInputsSections = [
  inputDaySection,
  inputMonthSection,
  inputYearSection,
];
const allInputsTitles = [inputDayTitle, inputMonthTitle, inputYearTitle];
const allInputs = [inputDay, inputMonth, inputYear];

const btnAgeCalc = document.querySelector("#btn-age-calc");

const textAgeInYears = document.querySelector("#age-in-years");
const textAgeInMonths = document.querySelector("#age-in-months");
const textAgeInDays = document.querySelector("#age-in-days");
// .
// .
// .
// .
// .
// .
// .
// . Constraining numbers in the inputs
[inputDay, inputMonth].forEach((input) => {
  input.setAttribute(
    "oninput",
    "this.value = this.value.replace(/[^0-9]/g, '').substring(0, 2);"
  );
});

inputYear.setAttribute(
  "oninput",
  "this.value = this.value.replace(/[^0-9]/g, '').substring(0, 4);"
);
// .
// .
// .
// .
// .
// .
// .
// . Functions
function clearWarnings(array) {
  let dateWarning = ageCalcContent.querySelector("#date-warning");

  array.forEach((input, index) => {
    if (input.classList.contains("warning")) {
      let selectElementP = allInputsSections[index].querySelector(
        ".age-calc__warning-text"
      );

      allInputsTitles[index].classList.remove("warning");
      input.classList.remove("warning");
      if (selectElementP) {
        allInputsSections[index].removeChild(selectElementP);
      }
    }
  });

  if (dateWarning) {
    ageCalcContent.removeChild(dateWarning);
  }

  if (textAgeInYears.innerHTML !== "- -") {
    textAgeInYears.innerHTML = "- -";
    textAgeInMonths.innerHTML = "- -";
    textAgeInDays.innerHTML = "- -";
  }
}

function checkIfIsEmpty(array) {
  array.forEach((input, index) => {
    let warningText = document.createElement("p");
    warningText.setAttribute("class", "age-calc__warning-text");
    warningText.textContent = "This field is required";

    if (input.value === "") {
      allInputsTitles[index].classList.add("warning");
      input.classList.add("warning");
      allInputsSections[index].appendChild(warningText);
    }
  });
}

function checkIfIsValid(array) {
  array.forEach((input, index) => {
    if (!input.classList.contains("warning")) {
      let warningText = document.createElement("p");
      warningText.setAttribute("class", "age-calc__warning-text");
      warningMessage = [
        "Must be a valid day",
        "Must be a valid month",
        "Must be in the past",
      ];
      let value = ["day", "month", "year"];
      let condition = [31, 12, currentDate.getFullYear()];

      if (Number(input.value) > condition[index]) {
        allInputsTitles[index].classList.add("warning");
        input.classList.add("warning");
        warningText.textContent = warningMessage[index];
        allInputsSections[index].appendChild(warningText);
      } else if (Number(input.value) === 0) {
        allInputsTitles[index].classList.add("warning");
        input.classList.add("warning");
        warningText.textContent = `The ${value[index]} can't be 0`;
        allInputsSections[index].appendChild(warningText);
      }
    }
  });
}

function checkIfIsReal(array) {
  let vibeCheck = 0;

  array.forEach((vibe) => {
    if (!vibe.classList.contains("warning")) {
      vibeCheck += 1;
    }
  });

  if (vibeCheck === 3) {
    const createdDate = new Date();
    createdDate.setFullYear(inputYear.value);
    createdDate.setMonth(inputMonth.value - 1);
    createdDate.setDate(inputDay.value);

    if (createdDate.getMonth() + 1 !== Number(inputMonth.value)) {
      let warningText = document.createElement("p");
      warningText.setAttribute("class", "age-calc__warning-text");
      warningText.setAttribute("id", "date-warning");
      warningText.textContent = "Must be a valid date";

      array.forEach((input, index) => {
        allInputsTitles[index].classList.add("warning");
        input.classList.add("warning");
      });
      inputsBox.after(warningText);
    } else if (
      (createdDate.getFullYear() === currentDate.getFullYear() &&
        createdDate.getMonth() > currentDate.getMonth()) ||
      (createdDate.getFullYear() === currentDate.getFullYear() &&
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getDate() >= currentDate.getDate())
    ) {
      let warningText = document.createElement("p");
      warningText.setAttribute("class", "age-calc__warning-text");
      warningText.setAttribute("id", "date-warning");
      warningText.textContent = "Must be a date in the past";

      array.forEach((input, index) => {
        allInputsTitles[index].classList.add("warning");
        input.classList.add("warning");
      });
      inputsBox.after(warningText);
    }
  }
}

function calcAndInsertion(array) {
  let vibeCheck = 0;

  array.forEach((vibe) => {
    if (!vibe.classList.contains("warning")) {
      vibeCheck += 1;
    }
  });

  if (vibeCheck === 3) {
    const createdDate = new Date();
    createdDate.setFullYear(inputYear.value);
    createdDate.setMonth(inputMonth.value - 1);
    createdDate.setDate(inputDay.value);

    const ageInMiliseconds = currentDate.getTime() - createdDate.getTime();

    const timeElapsed = new Date(ageInMiliseconds);

    const ageInYears = timeElapsed.getFullYear() - 1970;
    const ageInMonths = timeElapsed.getMonth();
    const ageInDays = timeElapsed.getDate();

    textAgeInYears.innerHTML = ageInYears;
    textAgeInMonths.innerHTML = ageInMonths;
    textAgeInDays.innerHTML = ageInDays;
  }
}

function calculateAge() {
  clearWarnings(allInputs);
  checkIfIsEmpty(allInputs);
  checkIfIsValid(allInputs);
  checkIfIsReal(allInputs);
  calcAndInsertion(allInputs);
}
// .
// .
// .
// .
// .
// .
// .
// . Event listener
btnAgeCalc.addEventListener("click", calculateAge);
