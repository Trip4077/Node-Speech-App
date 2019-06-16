const SpeecRecognition = window.SpeecRecognition || window.webkitSpeechRecognition;
const recognition = new SpeecRecognition();

const socket = io();

recognition.lang = 'en-US';

document.querySelector('button').addEventListener('click', () => {
    recognition.start();
});

recognition.addEventListener('result', e => {
    const last = e.results.length - 1;
    const text = e.results[last][0].transcript;

    console.log(text)
    console.log('Confidence: ' + e.results[0][0].confidence);

    socket.emit('chat message', text);
});

const synthVoice = text => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    utterance.text = text;

    synth.speak(utterance);
}

socket.on('bot reply', replyText => {
    synthVoice(replyText);
});