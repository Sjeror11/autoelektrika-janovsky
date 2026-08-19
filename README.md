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
- veřejná databáze skutečných oprav v `cases/`;
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

Soubor `cases/cases.json` slouží jako jednoduchý datový zdroj pro budoucí vyhledávání, filtrování a AI práci s archivem.

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

Po každém nasazení se kontroluje hlavní doména, `/cases/`, `sitemap.xml`, kontakty, mobilní vzhled a jeden skutečný AI dotaz.

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
