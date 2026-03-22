// Gemini AI Chat Integration pro Autoelektrika Janovský
// DIRECT API VERSION - Volá Gemini API přímo z frontendu

// Gemini API konfigurace
const GEMINI_API_KEY = 'AIzaSyD6XvCql5zkTWRzthUX9XTGnon7f206Hn4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// System prompt pro autoelektrika
const SYSTEM_PROMPT = `Jsi virtuální diagnostický asistent pro Autoelektriku Janovský. Tvůj úkol je pomoci zákazníkům s prvotní diagnostikou problémů s elektroinstalací vozidla a poskytnout užitečné rady.

DŮLEŽITÉ INFORMACE:
- Majitel: Lukáš Janovský
- Telefon: 777 100 478
- Email: lakyjanovsky@seznam.cz
- Zkušenosti: 23+ let v oboru
- Specializace: diagnostika, opravy startérů a alternátorů, montáže příslušenství, mobilní zásahy

TVŮJ STYL:
- Profesionální, ale přátelský
- Používej český jazyk
- Vysvětluj technické věci srozumitelně
- Pokud problém vyžaduje fyzickou kontrolu, doporuč kontaktovat technika
- Při závažných problémech nabídni okamžitý kontakt (telefon)

POKUD SE ZÁKAZNÍK PTÁ NA:
- Ceny: Řekni, že záleží na závadě, nabídni nezávaznou konzultaci
- Dostupnost: Objednávky přes telefon nebo email
- Lokaci: Mobilní servis v rámci kraje + dílna dle domluvy`;

// Chat history pro kontext
let chatHistory = [];

/**
 * Odeslání zprávy do Gemini API
 */
async function sendToGemini(userMessage) {
    try {
        // Připrav konverzační historii
        const contents = [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: 'model',
                parts: [{ text: 'Rozumím, jsem diagnostický asistent Autoelektrika Janovský. Rád pomohu s diagnostikou problémů s elektroinstalací vozidla.' }]
            }
        ];

        // Přidej historii konverzace
        chatHistory.forEach(msg => {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        });

        // Přidej novou zprávu
        contents.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        // Zavolej Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

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
        console.error('Gemini API Error:', error);

        // User-friendly error messages
        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            return '⚠️ Nelze se připojit k AI asistentovi. Zkontrolujte prosím připojení k internetu nebo nás kontaktujte přímo: 📞 777 100 478';
        }

        if (error.message?.includes('quota') || error.message?.includes('429')) {
            return '⚠️ AI služba je momentálně přetížená. Zkuste to prosím za chvíli nebo kontaktujte přímo: 📞 777 100 478';
        }

        return '⚠️ Omlouváme se, došlo k chybě. Prosím kontaktujte nás přímo: 📞 777 100 478 nebo ✉️ lakyjanovsky@seznam.cz';
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
