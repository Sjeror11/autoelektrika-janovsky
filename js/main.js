const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const openAiDemoButton = document.getElementById('openAiDemo');
const closeAiDemoButton = document.getElementById('closeAiDemo');
const aiDemoWindow = document.getElementById('aiDemoWindow');
const aiDemoForm = document.getElementById('aiDemoForm');
const aiMessages = document.querySelector('.ai__messages');
const aiInput = document.getElementById('aiInput');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

const toggleNavigation = () => {
    nav.classList.toggle('active');
    document.body.classList.toggle('nav-open');
};

if (menuToggle) {
    menuToggle.addEventListener('click', toggleNavigation);
}

nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

const openAiDemo = () => {
    aiDemoWindow?.classList.add('active');
    aiDemoWindow?.setAttribute('aria-hidden', 'false');
    aiInput?.focus();
};

const closeAiDemo = () => {
    aiDemoWindow?.classList.remove('active');
    aiDemoWindow?.setAttribute('aria-hidden', 'true');
};

openAiDemoButton?.addEventListener('click', openAiDemo);
closeAiDemoButton?.addEventListener('click', closeAiDemo);

aiDemoWindow?.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeAiDemo();
    }
});

const addAiMessage = (message, role = 'assistant') => {
    if (!aiMessages) return;
    const wrapper = document.createElement('div');
    wrapper.className = `ai__message ai__message--${role}`;
    const strong = document.createElement('strong');
    strong.textContent = role === 'assistant' ? 'Asistent:' : 'Vy:';
    const text = document.createElement('p');
    text.textContent = message;
    wrapper.append(strong, text);
    aiMessages.append(wrapper);
    aiMessages.scrollTo({ top: aiMessages.scrollHeight, behavior: 'smooth' });
};

const cannedResponses = [
    'Podle popisu doporučuji začít měřením napětí na baterii a alternátoru. Dokážete zjistit hodnoty při běžícím motoru?',
    'Díky za informace. Pokud startér pouze cvaká, je možné, že relé nebo solenoid nedodává plný proud. Přijedeme s přenosným testerem.',
    'Kontrolka dobíjení může signalizovat opotřebené uhlíky alternátoru. Doporučuji neodkládat opravu, abychom předešli vybití baterie.'
];

aiDemoForm?.addEventListener('submit', event => {
    event.preventDefault();
    const value = aiInput?.value.trim();
    if (!value) return;
    addAiMessage(value, 'user');
    aiInput.value = '';
    setTimeout(() => {
        const response = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
        addAiMessage(response, 'assistant');
    }, 700);
});

// Contact form handling - create mailto link
contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    // Validation
    if (!name?.value.trim()) {
        alert('⚠️ Prosím vyplňte vaše jméno');
        name?.focus();
        return;
    }

    if (!email?.value.trim() || !email.value.includes('@')) {
        alert('⚠️ Prosím zadejte platný e-mail');
        email?.focus();
        return;
    }

    if (!phone?.value.trim()) {
        alert('⚠️ Prosím zadejte telefon');
        phone?.focus();
        return;
    }

    if (!message?.value.trim() || message.value.length < 10) {
        alert('⚠️ Prosím popište problém detailněji (min. 10 znaků)');
        message?.focus();
        return;
    }

    // Create mailto link
    const subject = encodeURIComponent('Poptávka z webu - Autoelektrika Janovský');
    const body = encodeURIComponent(
        `Jméno: ${name.value}\n` +
        `Email: ${email.value}\n` +
        `Telefon: ${phone.value}\n\n` +
        `Zpráva:\n${message.value}`
    );

    const mailtoLink = `mailto:lakyjanovsky@seznam.cz?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after short delay
    setTimeout(() => {
        contactForm.reset();
        alert('✅ Email byl připraven ve vašem emailovém klientu. Stačí ho odeslat.');
    }, 500);
});

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
