// Gemini AI Chat Integration pro Autoelektrika Janovský
// SECURE VERSION - API volá backend, klíč je chráněný!

// Backend API URL - automatická detekce prostředí
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'  // Local development
    : 'https://autoelektrika-backend.vercel.app';  // Production (změníš po deployi)

// Chat history pro kontext
let chatHistory = [];

/**
 * Odeslání zprávy do backendu
 */
async function sendToGemini(userMessage) {
    try {
        // Zavolej backend API
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                history: chatHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Backend error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.response;

        // Přidej do lokální historie
        chatHistory.push({
            role: 'user',
            content: userMessage
        });
        chatHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        return aiResponse;

    } catch (error) {
        console.error('Backend API Error:', error);

        // User-friendly error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            return '⚠️ Nelze se připojit k AI asistentovi. Zkontrolujte prosím připojení k internetu nebo nás kontaktujte přímo: 📞 777 100 478';
        }

        return '⚠️ ' + (error.message || 'Omlouváme se, došlo k chybě. Prosím kontaktujte nás přímo: 📞 777 100 478 nebo ✉️ lakyjanovsky@seznam.cz');
    }
}

/**
 * Reset chat historie
 */
function resetChat() {
    chatHistory = [];
}

// Export pro použití v main.js
window.GeminiChat = {
    send: sendToGemini,
    reset: resetChat
};
