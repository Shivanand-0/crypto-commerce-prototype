// Crypto Quiz Data by Level
const quizData = {
  beginner: [
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
    },
    {
      question: 'What is a crypto address?',
      options: [
        'A place to store coins physically',
        'A unique string to send/receive crypto',
        'A government ID',
        'A type of NFT'
      ],
      answer: 1
    },
    {
      question: 'Which is a popular use of NFTs?',
      options: [
        'Digital art ownership',
        'Sending emails',
        'Mining Bitcoin',
        'Paying taxes'
      ],
      answer: 0
    },
    {
      question: 'What is a crypto wallet used for?',
      options: [
        'Storing private and public keys',
        'Mining new coins',
        'Printing money',
        'Paying bills'
      ],
      answer: 0
    },
    {
      question: 'Which of these is a stablecoin?',
      options: [
        'USDT',
        'Bitcoin',
        'Dogecoin',
        'Ether'
      ],
      answer: 0
    },
    {
      question: 'What is the main feature of blockchain?',
      options: [
        'Centralized control',
        'Immutability and transparency',
        'Physical coins',
        'Government regulation only'
      ],
      answer: 1
    }
  ],
  intermediate: [
    {
      question: 'What is Proof of Work (PoW)?',
      options: [
        'A voting system',
        'A consensus mechanism using computational puzzles',
        'A type of wallet',
        'A crypto exchange'
      ],
      answer: 1
    },
    {
      question: 'Which blockchain introduced smart contracts?',
      options: [
        'Bitcoin',
        'Ethereum',
        'Litecoin',
        'Dogecoin'
      ],
      answer: 1
    },
    {
      question: 'What is a private key?',
      options: [
        'A public address',
        'A secret code to access funds',
        'A type of NFT',
        'A mining tool'
      ],
      answer: 1
    },
    {
      question: 'What is DeFi?',
      options: [
        'Decentralized Finance',
        'Digital Files',
        'Data Filtering',
        'Direct Funding'
      ],
      answer: 0
    },
    {
      question: 'Which is a decentralized exchange?',
      options: [
        'Coinbase',
        'Uniswap',
        'PayPal',
        'Robinhood'
      ],
      answer: 1
    },
    {
      question: 'What is a liquidity pool?',
      options: [
        'A swimming pool for coins',
        'Funds locked in a smart contract for trading',
        'A type of wallet',
        'A mining farm'
      ],
      answer: 1
    },
    {
      question: 'What is a gas fee?',
      options: [
        'A fee for car fuel',
        'A payment to process blockchain transactions',
        'A tax on crypto',
        'A wallet maintenance fee'
      ],
      answer: 1
    },
    {
      question: 'What is staking?',
      options: [
        'Locking up crypto to support a network and earn rewards',
        'Sending coins to an exchange',
        'Mining with hardware',
        'Paying transaction fees'
      ],
      answer: 0
    },
    {
      question: 'What is a DAO?',
      options: [
        'Digital Asset Organization',
        'Decentralized Autonomous Organization',
        'Data Analysis Office',
        'Direct Access Option'
      ],
      answer: 1
    },
    {
      question: 'What is an airdrop in crypto?',
      options: [
        'Dropping coins from a plane',
        'Free distribution of tokens to wallets',
        'A type of NFT',
        'A mining process'
      ],
      answer: 1
    },
    {
      question: 'What is a cold wallet?',
      options: [
        'A wallet kept in a fridge',
        'An offline crypto storage device',
        'A hot wallet',
        'A type of blockchain'
      ],
      answer: 1
    },
    {
      question: 'What is a token?',
      options: [
        'A digital asset built on a blockchain',
        'A physical coin',
        'A type of wallet',
        'A mining tool'
      ],
      answer: 0
    },
    {
      question: 'What is an oracle in blockchain?',
      options: [
        'A fortune teller',
        'A service providing external data to smart contracts',
        'A type of wallet',
        'A mining pool'
      ],
      answer: 1
    },
    {
      question: 'What is a fork in blockchain?',
      options: [
        'A split in the blockchain protocol',
        'A type of wallet',
        'A mining tool',
        'A crypto exchange'
      ],
      answer: 0
    },
    {
      question: 'What is a public key?',
      options: [
        'A key to your house',
        'A cryptographic address to receive crypto',
        'A mining tool',
        'A type of NFT'
      ],
      answer: 1
    }
  ],
  advanced: [
    {
      question: 'What is an atomic swap?',
      options: [
        'A nuclear transaction',
        'A trustless exchange between blockchains',
        'A type of NFT',
        'A mining process'
      ],
      answer: 1
    },
    {
      question: 'What is sharding in blockchain?',
      options: [
        'Breaking a blockchain into smaller pieces for scalability',
        'A type of wallet',
        'A mining process',
        'A crypto exchange'
      ],
      answer: 0
    },
    {
      question: 'What is a zero-knowledge proof?',
      options: [
        'A proof that reveals no information except validity',
        'A mining tool',
        'A type of NFT',
        'A wallet password'
      ],
      answer: 0
    },
    {
      question: 'What is a Merkle tree?',
      options: [
        'A data structure for efficient verification',
        'A type of wallet',
        'A mining pool',
        'A crypto exchange'
      ],
      answer: 0
    },
    {
      question: 'What is slashing in Proof of Stake?',
      options: [
        'Cutting coins in half',
        'Penalizing validators for malicious actions',
        'A mining process',
        'A type of NFT'
      ],
      answer: 1
    },
    {
      question: 'What is a flash loan?',
      options: [
        'A loan that must be repaid within one transaction',
        'A loan from a bank',
        'A type of NFT',
        'A mining tool'
      ],
      answer: 0
    },
    {
      question: 'What is front-running in DeFi?',
      options: [
        'Executing a transaction with prior knowledge of pending trades',
        'Running a blockchain node',
        'A type of NFT',
        'A mining process'
      ],
      answer: 0
    },
    {
      question: 'What is a wrapped token?',
      options: [
        'A token representing another asset on a different blockchain',
        'A token in a gift wrap',
        'A mining tool',
        'A type of NFT'
      ],
      answer: 0
    },
    {
      question: 'What is impermanent loss?',
      options: [
        'Temporary loss of funds in liquidity pools due to price changes',
        'A mining process',
        'A type of NFT',
        'A wallet bug'
      ],
      answer: 0
    },
    {
      question: 'What is a sidechain?',
      options: [
        'A separate blockchain attached to a main chain',
        'A type of wallet',
        'A mining pool',
        'A crypto exchange'
      ],
      answer: 0
    },
    {
      question: 'What is MEV (Miner Extractable Value)?',
      options: [
        'Profit miners can make by reordering transactions',
        'A type of NFT',
        'A mining tool',
        'A wallet bug'
      ],
      answer: 0
    },
    {
      question: 'What is a rollup in blockchain?',
      options: [
        'A scaling solution that bundles transactions',
        'A type of wallet',
        'A mining process',
        'A crypto exchange'
      ],
      answer: 0
    },
    {
      question: 'What is a validator?',
      options: [
        'A participant who confirms transactions in PoS',
        'A type of NFT',
        'A mining tool',
        'A wallet bug'
      ],
      answer: 0
    },
    {
      question: 'What is a governance token?',
      options: [
        'A token that allows voting on protocol changes',
        'A type of NFT',
        'A mining tool',
        'A wallet bug'
      ],
      answer: 0
    },
    {
      question: 'What is a parachain?',
      options: [
        'A blockchain that runs parallel to a main chain',
        'A type of wallet',
        'A mining pool',
        'A crypto exchange'
      ],
      answer: 0
    }
  ]
};

const quizBox = document.getElementById('quiz-box');
const quizResult = document.getElementById('quiz-result');
const quizSetup = document.getElementById('quiz-setup');
let questions = [];
let current = 0;
let score = 0;
let selected = null;
let total = 5;

function getRandomQuestions(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

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
  document.querySelectorAll('input[name="option"]').forEach(input => {
    input.onclick = () => { selected = parseInt(input.value); };
  });
}

function showResult() {
  quizBox.style.display = 'none';
  quizResult.style.display = 'block';
  let message = '';
  if (score <= Math.floor(total/3)) message = 'Beginner: Keep learning!';
  else if (score <= Math.floor(2*total/3)) message = 'Intermediate: Good job!';
  else message = 'Advanced: Excellent!';
  quizResult.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Your score: <strong>${score} / ${total}</strong></p>
    <p>${message}</p>
    <button class="crypto-btn" id="try-again-btn">Try Again</button>
  `;
  document.getElementById('try-again-btn').onclick = () => {
    quizResult.style.display = 'none';
    quizSetup.style.display = 'block';
    quizBox.style.display = 'none';
    current = 0;
    score = 0;
    selected = null;
  };
}

// Setup form logic
const setupForm = document.getElementById('setup-form');
setupForm.onsubmit = function(e) {
  e.preventDefault();
  const level = document.getElementById('level-select').value;
  total = parseInt(document.getElementById('num-select').value, 10);
  questions = getRandomQuestions(quizData[level], total);
  current = 0;
  score = 0;
  selected = null;
  quizSetup.style.display = 'none';
  quizBox.style.display = 'block';
  quizResult.style.display = 'none';
  renderQuestion(current);
};

// Initial render
renderQuestion(current); 