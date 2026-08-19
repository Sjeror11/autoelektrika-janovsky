// Gemini AI Chat Integration pro Autoelektrika Janovský
// BACKEND API VERSION - Volá zabezpečený backend místo přímého Gemini API

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://autoelektrika-backend.vercel.app';

// Chat history pro kontext
let chatHistory = [];
let repairCasesPromise = null;

const SEARCH_STOP_WORDS = new Set([
    'auto', 'auta', 'automobil', 'mam', 'mám', 'jsem', 'je', 'jsou', 'se', 'mi',
    'na', 'do', 'od', 'pro', 'pri', 'při', 'po', 'a', 'i', 'nebo', 'ale', 'to',
    'ten', 'ta', 'toto', 'tahle', 'nejde', 'funguje', 'problem', 'problém', 'zavada',
    'závada', 'chyba', 'chci', 'potrebuji', 'potřebuji', 'co', 'jak', 'kde'
]);

function normalizeSearchText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function getSearchTokens(message) {
    return normalizeSearchText(message)
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length >= 3 && !SEARCH_STOP_WORDS.has(token));
}

async function loadRepairCases() {
    if (!repairCasesPromise) {
        repairCasesPromise = fetch('/cases/cases.json', { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Cases HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => Array.isArray(data?.cases) ? data.cases : [])
            .catch((error) => {
                console.warn('Databázi oprav se nepodařilo načíst:', error?.message || error);
                return [];
            });
    }

    return repairCasesPromise;
}

function scoreRepairCase(repairCase, message) {
    const normalizedMessage = normalizeSearchText(message);
    const tokens = getSearchTokens(message);
    if (tokens.length === 0) {
        return 0;
    }

    const identity = normalizeSearchText([
        repairCase.make,
        repairCase.model,
        repairCase.engine,
        repairCase.id
    ].filter(Boolean).join(' '));

    const haystack = normalizeSearchText([
        repairCase.make,
        repairCase.model,
        repairCase.year,
        repairCase.engine,
        ...(repairCase.symptoms || []),
        ...(repairCase.systems || []),
        repairCase.cause,
        repairCase.repair,
        repairCase.status,
        repairCase.id
    ].filter(Boolean).join(' '));

    let score = 0;
    for (const token of tokens) {
        if (!haystack.includes(token)) {
            continue;
        }

        score += 1;
        if (identity.includes(token)) {
            score += 2;
        }
        if (/^[pubc]\d{4}$/i.test(token)) {
            score += 5;
        }
    }

    const make = normalizeSearchText(repairCase.make);
    const model = normalizeSearchText(repairCase.model);
    if (make && normalizedMessage.includes(make)) {
        score += 3;
    }
    if (model && model.length >= 4 && normalizedMessage.includes(model)) {
        score += 4;
    }

    return score;
}

function compactCaseContext(repairCase) {
    const title = [repairCase.make, repairCase.model, repairCase.engine]
        .filter(Boolean)
        .join(' ');
    const symptoms = (repairCase.symptoms || []).slice(0, 4).join(', ');
    const absoluteUrl = repairCase.url
        ? new URL(repairCase.url, window.location.origin).href
        : '';

    return [
        `Případ: ${title || repairCase.id}`,
        symptoms ? `Příznaky: ${symptoms}` : '',
        repairCase.cause ? `Zjištěná příčina: ${repairCase.cause}` : '',
        repairCase.repair ? `Oprava: ${repairCase.repair}` : '',
        repairCase.status ? `Stav: ${repairCase.status}` : '',
        absoluteUrl ? `Detail: ${absoluteUrl}` : ''
    ].filter(Boolean).join('\n');
}

async function buildMessageWithRepairContext(userMessage) {
    // Backend má limit 2000 znaků. U dlouhého dotazu dáme přednost přesnému textu uživatele.
    if (userMessage.length > 1250) {
        return userMessage;
    }

    const repairCases = await loadRepairCases();
    if (repairCases.length === 0) {
        return userMessage;
    }

    const matches = repairCases
        .map((repairCase) => ({ repairCase, score: scoreRepairCase(repairCase, userMessage) }))
        .filter((item) => item.score >= 2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);

    if (matches.length === 0) {
        return userMessage;
    }

    const header = [
        'INTERNÍ KONTEXT Z OVĚŘENÝCH PŘÍPADŮ DÍLNY:',
        'Níže jsou skutečné dříve řešené případy Autoelektrika Janovský.',
        'Použij je pouze pokud jsou pro aktuální dotaz opravdu relevantní. Podobnost příznaků není důkaz stejné závady.',
        'Pokud případ použiješ, můžeš návštěvníka odkázat na uvedený detail.'
    ].join('\n');

    let context = header;
    for (const { repairCase } of matches) {
        const candidate = `${context}\n\n${compactCaseContext(repairCase)}`;
        if ((userMessage.length + candidate.length + 20) > 1950) {
            break;
        }
        context = candidate;
    }

    if (context === header) {
        return userMessage;
    }

    return `${userMessage}\n\n${context}`;
}

/**
 * Odeslání zprávy do backend API
 */
async function sendToBackend(userMessage) {
    try {
        const requestMessage = await buildMessageWithRepairContext(userMessage);
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: requestMessage,
                history: chatHistory,
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || `API error: ${response.status}`);
        }

        const aiResponse = data.response;

        // Do lokální historie ukládáme původní text návštěvníka, ne interní kontext databáze.
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
