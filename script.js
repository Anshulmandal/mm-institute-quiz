// Quiz Questions Data
const quizData = [
  {
    question: "To hide the name of the company, you need to define?",
    options: ["Tally Audit", "Security Control", "Tally Vault Password", "Create at least one User"],
    correct: 2,
  },
  {
    question: "Which function key is used to select journal voucher?",
    options: ["F6", "F7", "F8", "F9"],
    correct: 1,
  },
  {
    question: "Which of the following is used for voucher entry?",
    options: [
      "Groups",
      "Sub Groups",
      "Ledger Account",
      "Depends on number of companies",
    ],
    correct: 2,
  },
  {
    question: " If the financial year is from 1st April 2016 and the books beginning from 1st January 2017 then what will be the closing date?",
    options: [" 31st March 2016", " 31st March 2017", " 31st March 2018", "None of the above"],
    correct: 1,
  },
  {
    question: "Where do we record transactions of salary, rent or interest paid?",
    options: ["Contra voucher", "Payment voucher", "Journal voucher", "Reciept voucher"],
    correct: 1,
  },
  {
    question: "If we purchase any fixed asset in credit, we can pass it from ?",
    options: [" Receipt mode", " Payment mode", "Purchase mode", "Contra mode"],
    correct: 2,
  },
  {
    question: "Which menu is used to create new ledgers, groups and voucher types in Tally?",
    options: ["Import", "Reports", "Masters", "Transactions"],
    correct: 2,
  },
  {
    question: "To use Dr/Cr instead of To/By or vice versa during voucher entry, press?",
    options: ["F10", "F11", "F7", "F12"],
    correct: 3,
  },
  {
    question: "Tally Prime supports which operating systems?",
    options: [" Windows", "Mac", "Linux", " Both Windows & Mac"],
    correct: 0,
  },
  {
    question: "We can change the Company Information from??",
    options: ["Company Info > View", "Company Info > Back up", "Company Info > Split Company Data", "Company Info > Alter"],
    correct: 3,
  },
    {
    question: "For which voucher F6 used?",
    options: ["Sales Voucher", "Receipt Voucher", " Purchase Voucher", "All of the above"],
    correct: 1,
  },
  {
    question: "Sales Tax Ledger comes under which group?",
    options: [" Sales", "purchases", "Duties and Taxes", "Indirect Expenses"],
    correct: 2,
  },
  {
    question: "Which menu appears after starting Tally for the first time?",
    options: [
      "Display",
      "Company info",
      "Gateway of Tally",
      "None of these",
    ],
    correct: 1,
  },
  {
    question: " Which option is used to open company created in Tally?",
    options: [" Create Company", "Alter", "Select Company", "Shut Company"],
    correct: 2,
  },
  {
    question: "What type of voucher is used to transfer amount/funds from one bank to another?",
    options: ["Contra voucher", "Payment voucher", "Journal voucher", "Post Dated"],
    correct: 0,
  },
  {
    question: "The numbers of predefined ledgers in Tally are ?",
    options: ["2", "4", "6", "3"],
    correct: 0,
  },
  {
    question: "In general the financial year from shall be from__?",
    options: ["1st April of any year", "31st March of any year", "All of them are true", " None of these"],
    correct: 0,
  },
  {
    question: "Which of the following is compulsory to create while entry in Accounts with Inventory ?",
    options: ["Stock Items", "Stock Groups", "Units of Measure", "All of these"],
    correct: 3,
  },
  {
    question: "What is the Golden Rule for Personal Account?",
    options: ["Debit what comes in, Credit what goes out", " Debit the receiver, Credit the giver", "Debit all expenses and losses, Credit all incomes and gains", "None of the above"],
    correct: 1,
  },
  {
    question: " Shortcut key to create a ledger in Tally?",
    options: [" Alt + L", "Ctrl + L", " Alt + C", "Ctrl + C"],
    correct: 2,
  },
]

// Global Variables
let currentQuestionIndex = 0
let userAnswers = []
let timeLeft = 1200 // 20 minutes in seconds
let timer
let studentName = ""

// Navigation Functions
function startQuiz() {
  window.location.href = "quiz.html"
}

function goHome() {
  window.location.href = "index.html"
}

function retakeQuiz() {
  // Clear previous data
  localStorage.removeItem("quizResults")
  localStorage.removeItem("studentName")
  window.location.href = "quiz.html"
}

function viewCertificate() {
  window.location.href = "certificate.html"
}

// Quiz Functions
function startQuizTimer() {
  const nameInput = document.getElementById("studentName")
  if (!nameInput.value.trim()) {
    alert("Please enter your name before starting the quiz.")
    return
  }

  studentName = nameInput.value.trim()
  localStorage.setItem("studentName", studentName)

  document.getElementById("quiz-start").style.display = "none"
  document.getElementById("quiz-questions").style.display = "block"

  // Initialize quiz
  userAnswers = new Array(quizData.length).fill(-1)
  currentQuestionIndex = 0
  timeLeft = 1200

  // Start timer
  timer = setInterval(updateTimer, 1000)

  // Load first question
  loadQuestion()
  updateProgress()
}

function updateTimer() {
  timeLeft--

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`

  if (timeLeft <= 0) {
    clearInterval(timer)
    submitQuiz()
  }
}

function loadQuestion() {
  const question = quizData[currentQuestionIndex]

  document.getElementById("question-text").textContent = question.question
  document.getElementById("current-question").textContent = currentQuestionIndex + 1
  document.getElementById("total-questions").textContent = quizData.length

  const optionsContainer = document.getElementById("options-container")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div")
    optionDiv.className = "option"
    optionDiv.onclick = () => selectOption(index)

    if (userAnswers[currentQuestionIndex] === index) {
      optionDiv.classList.add("selected")
    }

    optionDiv.innerHTML = `
            <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}>
            <span>${option}</span>
        `

    optionsContainer.appendChild(optionDiv)
  })

  // Update navigation buttons
  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0
  document.getElementById("next-btn").textContent =
    currentQuestionIndex === quizData.length - 1 ? "Submit Quiz" : "Next Question"
  document.getElementById("next-btn").disabled = userAnswers[currentQuestionIndex] === -1
}

function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex

  // Update UI
  const options = document.querySelectorAll(".option")
  options.forEach((option, index) => {
    option.classList.toggle("selected", index === optionIndex)
    const radio = option.querySelector('input[type="radio"]')
    radio.checked = index === optionIndex
  })

  // Enable next button
  document.getElementById("next-btn").disabled = false
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    loadQuestion()
    updateProgress()
  }
}

function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++
    loadQuestion()
    updateProgress()
  } else {
    submitQuiz()
  }
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100
  document.getElementById("progress").style.width = progress + "%"
}

function submitQuiz() {
  clearInterval(timer)

  // Calculate results
  let correctAnswers = 0
  const results = []

  for (let i = 0; i < quizData.length; i++) {
    const isCorrect = userAnswers[i] === quizData[i].correct
    if (isCorrect) correctAnswers++

    results.push({
      question: quizData[i].question,
      options: quizData[i].options,
      userAnswer: userAnswers[i],
      correctAnswer: quizData[i].correct,
      isCorrect: isCorrect,
    })
  }

  const percentage = Math.round((correctAnswers / quizData.length) * 100)

  // Save results
  const quizResults = {
    correctAnswers,
    totalQuestions: quizData.length,
    percentage,
    results,
    completedAt: new Date().toISOString(),
  }

  localStorage.setItem("quizResults", JSON.stringify(quizResults))

  // Redirect to results
  window.location.href = "results.html"
}

// Results Page Functions
function loadResults() {
  const results = JSON.parse(localStorage.getItem("quizResults"))
  const studentName = localStorage.getItem("studentName")

  if (!results) {
    alert("No quiz results found. Please take the quiz first.")
    window.location.href = "index.html"
    return
  }

  // Update score display
  document.getElementById("percentage-score").textContent = results.percentage + "%"
  document.getElementById("correct-answers").textContent = results.correctAnswers
  document.getElementById("incorrect-answers").textContent = results.totalQuestions - results.correctAnswers
  document.getElementById("total-score").textContent = results.totalQuestions
  document.getElementById("final-percentage").textContent = results.percentage + "%"

  // Update result message
  const resultMessage = getResultMessage(results.percentage)
  document.getElementById("result-message").textContent = resultMessage.title
  document.getElementById("result-description").textContent = resultMessage.description

  // Update certificate status
  const passed = results.percentage >= 60
  const certificateMessage = passed
    ? "Congratulations! You've earned a certificate. Click below to view it."
    : "Score 60% or higher to earn a certificate. You can retake the quiz."

  document.getElementById("certificate-message").textContent = certificateMessage

  if (passed) {
    document.getElementById("certificate-btn").style.display = "inline-flex"
  }

  // Update score circle color
  const scoreCircle = document.querySelector(".score-circle")
  if (results.percentage >= 80) {
    scoreCircle.style.background = "linear-gradient(45deg, #10b981, #059669)"
  } else if (results.percentage >= 60) {
    scoreCircle.style.background = "linear-gradient(45deg, #4f46e5, #7c3aed)"
  } else {
    scoreCircle.style.background = "linear-gradient(45deg, #ef4444, #dc2626)"
  }

  // Load answer review
  loadAnswerReview(results.results)
}

function getResultMessage(percentage) {
  if (percentage >= 90) {
    return {
      title: "Excellent!",
      description: "Outstanding performance! You've mastered the material.",
    }
  } else if (percentage >= 80) {
    return {
      title: "Great Job!",
      description: "Very good performance! You have a strong understanding.",
    }
  } else if (percentage >= 70) {
    return {
      title: "Good Work!",
      description: "Nice performance! You're on the right track.",
    }
  } else if (percentage >= 60) {
    return {
      title: "Well Done!",
      description: "You passed the quiz! Keep up the good work.",
    }
  } else {
    return {
      title: "Keep Learning!",
      description: "Don't give up! Review the material and try again.",
    }
  }
}

function loadAnswerReview(results) {
  const container = document.getElementById("answers-container")
  container.innerHTML = ""

  results.forEach((result, index) => {
    const answerDiv = document.createElement("div")
    answerDiv.className = `answer-item ${result.isCorrect ? "correct" : "incorrect"}`

    const userAnswerText = result.userAnswer >= 0 ? result.options[result.userAnswer] : "No answer"
    const correctAnswerText = result.options[result.correctAnswer]

    answerDiv.innerHTML = `
            <div class="answer-question">
                <strong>Question ${index + 1}:</strong> ${result.question}
            </div>
            <div class="answer-details">
                <div class="answer-row user-answer">
                    <div class="answer-icon ${result.isCorrect ? "correct" : "incorrect"}">
                        <i class="fas ${result.isCorrect ? "fa-check" : "fa-times"}"></i>
                    </div>
                    <strong>Your Answer:</strong> ${userAnswerText}
                </div>
                ${
                  !result.isCorrect
                    ? `
                <div class="answer-row correct-answer">
                    <div class="answer-icon correct">
                        <i class="fas fa-check"></i>
                    </div>
                    <strong>Correct Answer:</strong> ${correctAnswerText}
                </div>
                `
                    : ""
                }
            </div>
        `

    container.appendChild(answerDiv)
  })
}

// Certificate Page Functions
function loadCertificate() {
  const results = JSON.parse(localStorage.getItem("quizResults"))
  const studentName = localStorage.getItem("studentName")

  if (!results || !studentName || results.percentage < 60) {
    alert("Certificate not available. Please complete the quiz with at least 60% score.")
    window.location.href = "index.html"
    return
  }

  // Update certificate details
  document.getElementById("cert-student-name").textContent = studentName
  document.getElementById("cert-score").textContent = results.percentage + "%"
  document.getElementById("cert-date").textContent = new Date(results.completedAt).toLocaleDateString()
}

function printCertificate() {
  window.print()
}

// Page Load Events
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()

  switch (currentPage) {
    case "results.html":
      loadResults()
      break
    case "certificate.html":
      loadCertificate()
      break
  }
})

// Prevent back button during quiz
if (window.location.pathname.includes("quiz.html")) {
  history.pushState(null, null, location.href)
  window.onpopstate = () => {
    history.go(1)
  }
}
