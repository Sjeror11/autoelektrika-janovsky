# Pokyny pro práci na projektu

Před opravou nebo rozšířením webu si přečti privátní dokumentaci:

1. `/home/laky/autoelektrika-backend/docs/README.md`
2. `/home/laky/autoelektrika-backend/docs/PROVOZNI-PRIRUCKA.md`
3. podle úkolu také `/home/laky/autoelektrika-backend/docs/VYVOJ-A-SPOLUPRACE.md`
   nebo `/home/laky/autoelektrika-backend/docs/BEZPECNOST-A-TAJEMSTVI.md`

## Neměnné provozní body

- Produkce běží na `https://autoelektrika-janovsky.cz`.
- GitHub Pages publikuje větev `main` z kořene repozitáře.
- Zachovej `CNAME` s hodnotou `autoelektrika-janovsky.cz`.
- AI frontend volá `https://autoelektrika-backend.vercel.app`.
- Nikdy nevkládej Gemini API klíč ani jiné tajemství do tohoto repozitáře.
- Kontaktní údaje neměň bez výslovného požadavku uživatele.

## Ověření změn

- Prohlédni změny pomocí `git diff` a spusť `git diff --check`.
- Otestuj desktopovou i mobilní šířku.
- Ověř navigaci, telefon, e-mail, formulář a otevření AI chatu.
- Pokud se mění AI, otestuj běžný dotaz, navazující dotaz a nebezpečný scénář.
- Při produkčním nasazení ověř živou doménu podle provozní příručky.
- Významnou provozní změnu doplň do dokumentace a historie změn.
