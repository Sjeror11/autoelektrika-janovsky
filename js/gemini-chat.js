// Gemini AI Chat Integration pro Autoelektrika Janovský
// BACKEND API VERSION - Volá zabezpečený backend místo přímého Gemini API

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://autoelektrika-backend.vercel.app';

// Chat history pro kontext
let chatHistory = [];

/**
 * Odeslání zprávy do backend API
 */
async function sendToBackend(userMessage) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                history: chatHistory,
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || `API error: ${response.status}`);
        }

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

        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            return '⚠️ AI asistent je momentálně nedostupný. Zkuste to prosím za chvíli nebo nás kontaktujte přímo: 📞 777 100 478';
        }

        if (error.message?.includes('Příliš mnoho požadavků') || error.message?.includes('429')) {
            return '⚠️ AI služba je momentálně přetížená. Zkuste to prosím za chvíli nebo kontaktujte přímo: 📞 777 100 478';
        }

        return error.message || '⚠️ Omlouváme se, došlo k chybě. Prosím kontaktujte nás přímo: 📞 777 100 478 nebo ✉️ lakyjanovsky@seznam.cz';
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
    send: sendToBackend,
    reset: resetChat
};
