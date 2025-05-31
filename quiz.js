// Crypto Beginner Quiz Data
const quizQuestions = [
  {
    question: 'What is a cryptocurrency?',
    options: [
      'A type of video game',
      'A digital or virtual currency secured by cryptography',
      'A physical coin you can hold',
      'A government-issued currency'
    ],
    answer: 1
  },
  {
    question: 'Which is the first and most well-known cryptocurrency?',
    options: [
      'Ethereum',
      'Dogecoin',
      'Bitcoin',
      'Litecoin'
    ],
    answer: 2
  },
  {
    question: 'What is a blockchain?',
    options: [
      'A type of computer virus',
      'A decentralized digital ledger',
      'A social media platform',
      'A kind of wallet'
    ],
    answer: 1
  },
  {
    question: 'What do you need to access your crypto funds?',
    options: [
      'A public key',
      'A private key',
      'A bank account',
      'A passport'
    ],
    answer: 1
  },
  {
    question: 'What is an NFT?',
    options: [
      'A Non-Fungible Token',
      'A New Financial Tool',
      'A National Fund Transfer',
      'A Network File Transfer'
    ],
    answer: 0
  },
  {
    question: 'Which of these is a crypto wallet?',
    options: [
      'MetaMask',
      'PayPal',
      'Visa',
      'Mastercard'
    ],
    answer: 0
  },
  {
    question: 'What is the main benefit of decentralization?',
    options: [
      'Faster internet',
      'No single point of control',
      'Lower taxes',
      'More advertisements'
    ],
    answer: 1
  },
  {
    question: 'What is a smart contract?',
    options: [
      'A legal document',
      'A self-executing program on a blockchain',
      'A type of insurance',
      'A crypto exchange'
    ],
    answer: 1
  },
  {
    question: 'Which of these is NOT a cryptocurrency?',
    options: [
      'Ether',
      'Bitcoin',
      'Litecoin',
      'Dollar'
    ],
    answer: 3
  },
  {
    question: 'What does HODL mean in crypto slang?',
    options: [
      'Sell quickly',
      'Hold on for dear life',
      'Hack online digital ledger',
      'Hide old digital logs'
    ],
    answer: 1
  }
];

// Shuffle and pick 5 random questions
function getRandomQuestions(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const quizBox = document.getElementById('quiz-box');
const quizResult = document.getElementById('quiz-result');
const questions = getRandomQuestions(quizQuestions, 5);
let current = 0;
let score = 0;
let selected = null;

function renderQuestion(idx) {
  const q = questions[idx];
  quizBox.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'glossary-card';
  card.innerHTML = `
    <div class="card-header"><h3>Q${idx + 1}. ${q.question}</h3></div>
    <form id="quiz-form">
      ${q.options.map((opt, i) => `
        <div class="form-check">
          <input type="radio" name="option" id="opt${i}" value="${i}" class="form-check-input" ${selected === i ? 'checked' : ''}>
          <label for="opt${i}" class="form-check-label">${opt}</label>
        </div>
      `).join('')}
      <button type="submit" class="crypto-btn" style="margin-top:18px;">${idx === questions.length - 1 ? 'Finish' : 'Next'}</button>
    </form>
  `;
  quizBox.appendChild(card);
  document.getElementById('quiz-form').onsubmit = function(e) {
    e.preventDefault();
    const val = document.querySelector('input[name="option"]:checked');
    if (!val) return;
    if (parseInt(val.value) === q.answer) score++;
    selected = null;
    current++;
    if (current < questions.length) {
      renderQuestion(current);
    } else {
      showResult();
    }
  };
  // Save selected option
  document.querySelectorAll('input[name="option"]').forEach(input => {
    input.onclick = () => { selected = parseInt(input.value); };
  });
}

function showResult() {
  quizBox.style.display = 'none';
  quizResult.style.display = 'block';
  let message = '';
  if (score <= 2) message = 'Beginner: Keep learning!';
  else if (score <= 4) message = 'Intermediate: Good job!';
  else message = 'Expert: Excellent!';
  quizResult.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Your score: <strong>${score} / ${questions.length}</strong></p>
    <p>${message}</p>
    <button class="crypto-btn" onclick="window.location.reload()">Try Again</button>
  `;
}

// Initial render
renderQuestion(current); 