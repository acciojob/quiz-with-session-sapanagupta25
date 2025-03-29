const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved progress from session storage
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((q, i) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore previous selection from session storage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Handle quiz submission
function handleSubmit() {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display score and store it in local storage
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Display last score if available
function displayLastScore() {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreElement.textContent = `Last score: ${lastScore} out of ${questions.length}`;
  }
}

submitButton.addEventListener("click", handleSubmit);

renderQuestions();
displayLastScore();
