// Credits information for each semester
// credits are in credits.js file in the same directory
// import them ans use them in the code
// Define credits
import SemToCredits from "./credits.js";
import gradePoints from "./gradePoints.js";

const semesterInput = document.getElementById("semester");
const calculateButton = document.getElementById("calculate");
semesterInput.addEventListener("change", renderSubjectInputs);
window.addEventListener("load", renderSubjectInputs);
calculateButton.addEventListener("click", calculateSGPA);
// Function to dynamically render subject inputs

function renderSubjectInputs() {
  let credits = SemToCredits[parseInt(semesterInput.value)];

  const subjectInputsContainer = document.getElementById("subjectInputs");
  subjectInputsContainer.innerHTML = ""; // Clear previous inputs

  for (const subject in credits) {
    const label = document.createElement("label");
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

    subjectInputsContainer.appendChild(label);
    subjectInputsContainer.appendChild(select);
  }
}

function calculateSGPA() {
  let totalCredits = 0;
  let totalGradePoints = 0;
  const credits = SemToCredits[parseInt(semesterInput.value)];

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
