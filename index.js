import { SemToCredits, creditsTillSem } from "./credits.js";
import gradePoints from "./gradePoints.js";

const semesterInput = document.getElementById("semester");
const calculateButton = document.getElementById("calculate");
const switchCalculatorButton = document.getElementById("switchCalculator");
const cgpaCalculatorPopup = document.getElementById("cgpaCalculatorPopup");
const closePopupButton = document.querySelector(".close-popup");

semesterInput.addEventListener("change", renderSubjectInputs);
window.addEventListener("load", renderSubjectInputs);
calculateButton.addEventListener("click", calculateSGPA);

function renderSubjectInputs() {
  const semester = parseInt(semesterInput.value);
  const { subjectToCredits: credits, totalCredits } = SemToCredits[semester];

  const subjectInputsContainer = document.getElementById("subjectInputs");
  const totalCreditsElement = document.getElementById("totalCredits");

  subjectInputsContainer.innerHTML = ""; // Clear previous inputs

  for (const subject in credits) {
    const div = document.createElement("div"); // Create a container for each input
    div.classList.add("input-container");

    const label = document.createElement("label");
    label.setAttribute("for", subject); // Set label for attribute
    label.textContent = `${subject} (Credits: ${credits[subject]})`;

    const select = document.createElement("select");
    select.id = subject;

    // Populate options
    for (const grade in gradePoints) {
      const option = document.createElement("option");
      option.value = grade.toLowerCase();
      option.textContent = grade;
      select.appendChild(option);
    }

    div.appendChild(label);
    div.appendChild(select);
    subjectInputsContainer.appendChild(div);
  }

  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

function calculateSGPA() {
  let totalGradePoints = 0;
  const semester = parseInt(semesterInput.value);
  const { subjectToCredits: credits, totalCredits } = SemToCredits[semester];

  // Loop through each subject
  for (const subject in credits) {
    const gradeInput = document.getElementById(subject).value.toUpperCase();
    const gradePoint = gradePoints[gradeInput];

    if (gradePoint !== undefined) {
      totalGradePoints += gradePoint * credits[subject];
      totalCredits += credits[subject];
    }
  }

  const SGPA = totalGradePoints / totalCredits;
  document.getElementById("result").innerHTML = `Your SGPA is: ${SGPA.toFixed(
    2
  )}`;
}

// Function to open the popup
function openPopup() {
  cgpaCalculatorPopup.style.display = "block";
}

// Function to close the popup
function closePopup() {
  cgpaCalculatorPopup.style.display = "none";
}

// Event listener for the switchCalculatorButton
switchCalculatorButton.addEventListener("click", openPopup);

// Event listener for the closePopupButton
closePopupButton.addEventListener("click", closePopup);

document.getElementById("calculateCGPA").addEventListener("click", function () {
  const semester = parseInt(
    cgpaCalculatorPopup.querySelector("#semester").value
  );

  const cgpaPrevious = parseFloat(
    cgpaCalculatorPopup.querySelector("#cgpaPrevious").value
  );
  const sgpaCurrent = parseFloat(
    cgpaCalculatorPopup.querySelector("#sgpaCurrent").value
  );

  const totalCreditsPrevious = creditsTillSem[semester - 1];
  const totalCreditsCurrent = creditsTillSem[semester] - totalCreditsPrevious;

  const totalCGPAPrevious = cgpaPrevious * totalCreditsPrevious;
  const totalCGPACurrent = sgpaCurrent * totalCreditsCurrent;

  const totalCredits = totalCreditsPrevious + totalCreditsCurrent;

  const cgpa = (totalCGPAPrevious + totalCGPACurrent) / totalCredits;
  cgpaCalculatorPopup.querySelector(
    "#cgpaResult"
  ).textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
});
