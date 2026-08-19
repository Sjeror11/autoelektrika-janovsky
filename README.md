# Autoelektrika Janovský

Produkční web autoelektrikářských služeb Lukáše Janovského s veřejnou databází skutečných diagnostických případů.

- Web: <https://autoelektrika-janovsky.cz>
- Databáze oprav: <https://autoelektrika-janovsky.cz/cases/>
- Hosting frontendu: GitHub Pages
- AI diagnostický asistent: Vercel backend a Gemini API
- Produkční větev: `main`

## Funkce

- responzivní prezentace služeb;
- přímý telefonní a e-mailový kontakt;
- kontaktní formulář připravující e-mail pomocí `mailto:`;
- mobilní navigace;
- skutečný AI diagnostický asistent s navazující konverzací;
- AI asistent před odesláním dotazu lokálně vyhledá relevantní záznamy v databázi oprav a přidá je jako diagnostický kontext;
- veřejná databáze skutečných oprav v `cases/`;
- vyhledávání a filtrování případů podle značky, DTC, systému a příznaků;
- strojově čitelný přehled případů v `cases/cases.json`;
- samostatné SEO stránky případů s `TechArticle` structured data;
- `robots.txt` a `sitemap.xml` pro indexaci;
- vlastní doména s HTTPS.

## Struktura

```text
├── CNAME
├── index.html
├── robots.txt
├── sitemap.xml
├── cases/
│   ├── index.html
│   ├── cases.json
│   └── *.html             detailní diagnostické případy
├── css/style.css
├── images/
├── js/main.js
├── js/cases-search.js
└── js/gemini-chat.js
```

## Databáze oprav

Každý případ má pokud možno jednotnou strukturu:

- vozidlo, rok a motor;
- příznaky a DTC;
- naměřené hodnoty;
- postup diagnostiky a slepé cesty;
- skutečnou příčinu;
- provedenou opravu;
- ověření výsledku;
- stav `VYŘEŠENO`, `ROZPRACOVÁNO`, `NEVYŘEŠENO` nebo `UKONČENO – EKONOMICKY NEOPRAVENO`.

Soubor `cases/cases.json` je datový zdroj pro vyhledávání, filtrování a AI práci s archivem. Frontend AI asistenta porovná nový dotaz s případy, vybere nejvýše dva relevantní záznamy a přidá je do požadavku jako interní kontext. Původní text návštěvníka zůstává v historii chatu beze změny a podobný případ se nesmí vydávat za jistou diagnózu aktuálního vozidla.

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

Po každém nasazení se kontroluje hlavní doména, `/cases/`, `sitemap.xml`, kontakty, mobilní vzhled a jeden skutečný AI dotaz. U AI databáze se navíc ověřuje, že dotaz na známý případ (např. Meriva + výpadek serva) přidá odpovídající kontext, zatímco nesouvisející dotaz žádný případ nepřipojí.

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
