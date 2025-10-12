# 🚀 DEPLOYMENT INSTRUKCE - Autoelektrika Janovský

## ✅ CO JE UŽ HOTOVÉ:
- [x] Git repository inicializováno
- [x] Initial commit vytvořen (7 souborů)
- [x] README.md dokumentace
- [x] .gitignore nastavený
- [x] Favicon a SEO meta tagy
- [x] Funkční kontaktní formulář (FormSubmit.co)

## 📋 CO JEŠTĚ ZBÝVÁ:

### 1️⃣ Vytvoř GitHub Repository (2 minuty)

**Jdi na:** https://github.com/new

**Nastavení:**
- Repository name: `autoelektrika-janovsky`
- Description: "Profesionální webové stránky pro autoelektriku"
- Visibility: ✅ **Public** (nutné pro FREE GitHub Pages)
- ❌ **NEPŘIDÁVEJ:** README, .gitignore, license (už existují!)
- Klikni: **"Create repository"**

### 2️⃣ Push na GitHub (spusť v terminálu)

```bash
cd /home/laky/autoelektrika-janovsky

# Přidej GitHub remote
git remote add origin https://github.com/Sjeror11/autoelektrika-janovsky.git

# Push main branch
git push -u origin main
```

### 3️⃣ Aktivuj GitHub Pages (1 minuta)

1. Jdi na: https://github.com/Sjeror11/autoelektrika-janovsky/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** `main` (nebo `master`)
4. **Folder:** `/` (root)
5. Klikni: **"Save"**
6. Počkej 1-2 minuty na deployment

### 4️⃣ Otestuj Live Web

**GitHub Pages URL:**
```
https://sjeror11.github.io/autoelektrika-janovsky/
```

**Zkontroluj:**
- ✅ Web se načte správně
- ✅ Mobilní menu funguje
- ✅ Favicon se zobrazuje
- ✅ AI demo chat otevírá
- ✅ Kontaktní formulář funguje (zkus poslat test)

### 5️⃣ Aktivuj FormSubmit.co Email (DŮLEŽITÉ!)

**První odeslání formuláře:**
1. Otevři: https://sjeror11.github.io/autoelektrika-janovsky/
2. Vyplň kontaktní formulář
3. Odešli
4. **FormSubmit.co ti pošle potvrzovací email na `servis@autoelektrika-janovsky.cz`**
5. **KLIKNI NA POTVRZOVACÍ LINK** (aktivace FREE účtu)
6. Po aktivaci budou všechny další formuláře fungovat automaticky!

### 6️⃣ Připoj Custom Doménu (optional)

**Postup:**
1. Jdi na: https://github.com/Sjeror11/autoelektrika-janovsky/settings/pages
2. **Custom domain:** `autoelektrika-janovsky.cz`
3. Klikni: **"Save"**
4. GitHub vytvoří soubor `CNAME`

**DNS nastavení u registrátora domény:**
```
# Přidej CNAME záznam:
Type: CNAME
Name: www (nebo @)
Value: sjeror11.github.io
```

**Pro apex doménu (bez www):**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

### 7️⃣ SSL Certifikát (automaticky)

GitHub Pages automaticky vystaví **FREE SSL certifikát** (HTTPS) za 24 hodin po připojení domény.

---

## 🔥 QUICK START COMMANDS:

```bash
cd /home/laky/autoelektrika-janovsky

# 1. Přidej GitHub remote
git remote add origin https://github.com/Sjeror11/autoelektrika-janovsky.git

# 2. Push na GitHub
git push -u origin main

# 3. Hotovo! Jdi aktivovat GitHub Pages v Settings → Pages
```

---

## 📞 FORMSUBMIT.CO TESTING:

**Testovací zpráva (po nasazení):**
```
Jméno: Test Deployment
Email: tvuj-email@seznam.cz
Telefon: +420 777 100 478
Zpráva: Test kontaktního formuláře z nového webu. Pokud toto vidíš, vše funguje!
```

**Expected flow:**
1. Vyplň formulář → Odešli
2. FormSubmit.co redirect zpět → zobrazí "✅ Děkujeme za zprávu!"
3. Kontrola inbox `servis@autoelektrika-janovsky.cz`
4. **PRVNÍ EMAIL:** Potvrzovací link (klikni!)
5. **DALŠÍ EMAILY:** Budou chodit automaticky

---

## 🎯 FINÁLNÍ CHECKLIST:

- [ ] GitHub repo vytvořeno
- [ ] Code pushnutý na GitHub
- [ ] GitHub Pages aktivované
- [ ] Web funguje na https://sjeror11.github.io/autoelektrika-janovsky/
- [ ] FormSubmit.co aktivováno (potvrzovací email kliknutý)
- [ ] Custom doména připojena (optional)
- [ ] SSL certifikát aktivní (po 24h)
- [ ] Vše otestováno na mobilu i desktopu

---

**Po dokončení můžeš smazat tento soubor:**
```bash
rm DEPLOY_INSTRUCTIONS.md
git add .
git commit -m "Remove deployment instructions"
git push
```

🎉 **GRATULACE! Tvůj web je živý!**
