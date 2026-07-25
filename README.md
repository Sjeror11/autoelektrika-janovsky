# Autoelektrika Janovský

Produkční jednostránkový web autoelektrikářských služeb Lukáše Janovského.

- Web: <https://autoelektrika-janovsky.cz>
- Hosting frontendu: GitHub Pages
- AI diagnostický asistent: Vercel backend a Gemini API
- Produkční větev: `main`

## Funkce

- responzivní prezentace služeb;
- přímý telefonní a e-mailový kontakt;
- kontaktní formulář připravující e-mail pomocí `mailto:`;
- mobilní navigace;
- skutečný AI diagnostický asistent s navazující konverzací;
- SEO a Open Graph metadata;
- vlastní doména s HTTPS.

## Struktura

```text
├── CNAME
├── index.html
├── css/style.css
├── images/
├── js/main.js
└── js/gemini-chat.js
```

## Lokální spuštění

```bash
python3 -m http.server 8080
```

Potom otevřít <http://localhost:8080>.

Při lokálním spuštění očekává AI frontend backend na
`http://localhost:3000`. Produkční web volá
`https://autoelektrika-backend.vercel.app`.

## Nasazení

GitHub Pages publikuje obsah větve `main` z kořene repozitáře. Soubor `CNAME`
musí vždy zůstat v kořeni a obsahovat:

```text
autoelektrika-janovsky.cz
```

Po každém nasazení se kontroluje hlavní doména, `www`, kontakty, mobilní vzhled
a jeden skutečný AI dotaz.

## Provozní dokumentace

Podrobná dokumentace, obnova po výpadku a bezpečnostní postupy jsou uložené
odděleně v privátním repozitáři `Sjeror11/autoelektrika-backend`. Lokální kopie
je v `/home/laky/autoelektrika-backend/docs`.

## Bezpečnost

V tomto repozitáři nesmí být žádný Gemini API klíč. Produkční klíč je uložený
pouze v proměnných prostředí projektu Vercel. Starý klíč, který se v minulosti
objevil v historii repozitáře, se nesmí znovu použít.

## Kontakt

- Lukáš Janovský
- Telefon: [777 100 478](tel:+420777100478)
- E-mail: [lakyjanovsky@seznam.cz](mailto:lakyjanovsky@seznam.cz)

© Autoelektrika Janovský. Všechna práva vyhrazena.
