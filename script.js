// Masukkan API Key milikmu di sini
const API_KEY = "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"; // Ganti dengan API key OpenAI-mu

// Event listener untuk tombol kirim
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    // Tampilkan pesan pengguna
    addMessage(userInput, 'user-message');

    // Kosongkan input setelah mengirim pesan
    document.getElementById('user-input').value = '';

    // Tampilkan pesan "AI sedang mengetik..."
    const typingMessage = addMessage('AI sedang mengetik...', 'ai-message');

    // Kirim pesan ke OpenAI API
    try {
        const aiResponse = await getAIResponse(userInput);
        typingMessage.textContent = aiResponse; // Update dengan respons AI
    } catch (error) {
        typingMessage.textContent = 'Terjadi kesalahan. Coba lagi.';
        console.error(error);
    }
}

function addMessage(message, className) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(className);
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto scroll ke bawah
    return messageElement;
}

async function getAIResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4", // Atau "gpt-3.5-turbo"
            messages: [{ role: "user", content: userMessage }]
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
}