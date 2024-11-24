const WEBHOOK_URL = CONFIG.WEBHOOK_URL || 'YOUR_FALLBACK_WEBHOOK_URL';

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSend() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            try {
                // Replace YOUR_N8N_WEBHOOK_URL with your actual n8n webhook URL
                const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });
                
                const data = await response.json();
                addMessage(data.response, false);
            } catch (error) {
                console.error('Error:', error);
                addMessage("Sorry, I'm having trouble connecting right now.", false);
            }
        }
    }

    sendButton.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
}); 