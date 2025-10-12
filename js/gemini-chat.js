// Gemini AI Chat Integration pro Autoelektrika Janovský
// API Key - v produkci by měl být na backendu!
const GEMINI_API_KEY = 'AIzaSyDianaJzYYlmG9pvVVSjGWn9PAwokRMCNI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// System prompt - definuje chování AI
const SYSTEM_PROMPT = `Jsi virtuální diagnostický asistent pro Autoelektriku Janovský.

TVOJE ROLE:
- Pomáháš zákazníkům s prvotní diagnostikou problémů autoelektriky
- Komunikuješ profesionálně, ale přátelsky v češtině
- Poskytuješ užitečné rady, ale vždy doporučíš kontakt s technikem pro přesnou diagnostiku

ZNALOSTI:
- Autoelektrika: startéry, alternátory, baterie, elektroinstalace
- Diagnostika: OBD-II, CAN, čtení chybových kódů
- Běžné problémy: nechytá motor, kontrolky, vybíjení baterie
- Montáže: tažná zařízení, alarmy, kamery

DŮLEŽITÉ:
- Vždy se ptej na detaily (značka, model, příznaky)
- Navrhuj možné příčiny od nejčastějších
- Doporuč kontakt na technika: Lukáš Janovský, tel: 777 100 478
- Buď konkrétní a srozumitelný

STYL ODPOVĚDI:
- Krátké odstavce (2-3 věty)
- Číslované seznamy pro příčiny/řešení
- Emoji pro lepší čitelnost (⚡🔧🔋)
- Vždy zakončit: "Potřebujete pomoc? Zavolejte: 777 100 478"`;

// Chat history pro kontext
let chatHistory = [];

/**
 * Odeslání zprávy do Gemini API
 */
async function sendToGemini(userMessage) {
    try {
        // Přidej user message do historie
        chatHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        // Připrav API request
        const requestBody = {
            contents: [
                // System prompt jako první message
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Rozumím. Jsem diagnostický asistent Autoelektrika Janovský. Jak vám mohu pomoci?' }]
                },
                // Chat history
                ...chatHistory
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        // Zavolej API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();

        // Extrahuj odpověď
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Přidej AI odpověď do historie
        chatHistory.push({
            role: 'model',
            parts: [{ text: aiResponse }]
        });

        return aiResponse;

    } catch (error) {
        console.error('Gemini API Error:', error);
        return '⚠️ Omlouváme se, došlo k chybě při komunikaci s AI asistentem. Prosím kontaktujte nás přímo na: 777 100 478 nebo lakyjanovsky@seznam.cz';
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
