const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
    {
        image: './images/drink.jpg',
        text:"I'm Thirsty"
    },
    {
        image:'./images/food.jpg',
        text:"I'm Hungry"
    },
    {
        image:'./images/angry.jpg',
        text:"I'm Angry"
    },
    {
        image:'./images/happy.jpg',
        text:"I'm Happy"
    },
    {
        image:'./images/sad.jpg',
        text:"I'm Sad"
    },  
    {
        image:'./images/scared.jpg',
        text:"I'm Scared"
    },
    {
        image:'./images/hurt.jpg',
        text:"I'm Hurt"
    },
    {
        image:'./images/tired.jpg',
        text:"I'm Tired"
    },
    {
        image:'./images/home.jpg',
        text:'I wanna go Home'
    },
    {
        image:'./images/grandma.jpg',
        text:'I wanna go to Grandma'
    },
    {
        image:'./images/school.jpg',
        text:'I wanna go to School'
    },
    {
        image:'./images/outside.jpg',
        text:'I wanna go Outside'
    }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
