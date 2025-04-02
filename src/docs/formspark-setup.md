
# Formspark Implementatie Handleiding

## Stap 1: Maak een Formspark account
1. Ga naar [Formspark](https://formspark.io/) en registreer een account.
2. Na registratie, klik op de knop "Create a new form".
3. Geef je formulier een naam (bijvoorbeeld "EPA Woninglabel Aanvraag").
4. Kopieer de formulier ID die Formspark genereert (het ziet eruit als een alfanumerieke reeks, bijvoorbeeld "xayqBlvx").

## Stap 2: Update de ContactForm.tsx code
1. Open het bestand `src/components/contact/ContactForm.tsx`.
2. Vervang de placeholder `FORMSPARK_FORM_ID` met jouw eigen formulier ID:
   ```javascript
   const FORMSPARK_FORM_ID = "xayqBlvx"; // Vervang dit met jouw eigen ID van Formspark
   ```

## Stap 3: Configureer e-mail notificaties in Formspark
1. Log in op je Formspark dashboard.
2. Ga naar je formulier instellingen.
3. Configureer de e-mail notificaties:
   - Voeg het e-mailadres toe waar je formulierinzendingen wilt ontvangen.
   - Pas eventueel het onderwerp of andere e-mailinstellingen aan.
   - Je kunt ook automatische antwoorden instellen die naar je klanten worden gestuurd.

## Stap 4: Anti-spam instelling (optioneel maar aanbevolen)
1. In je formulierinstellingen in Formspark, configureer de anti-spam instellingen.
2. Overweeg CAPTCHA in te schakelen voor extra beveiliging tegen spam.
3. Je kunt ook een honeypot veld toevoegen (Formspark ondersteunt dit automatisch).

## Stap 5: Testen
1. Test het formulier door een proefinzending te doen.
2. Controleer of je de e-mailnotificatie ontvangt.
3. Controleer of de gegevens correct worden weergegeven in je Formspark dashboard.

## Formspark prijsstructuur
- Formspark biedt een gratis proefperiode.
- Daarna kost het ongeveer $25 voor 10.000 inzendingen per jaar.
- Zie hun [prijspagina](https://formspark.io/pricing/) voor de actuele tarieven.

## Voordelen van Formspark
- Geen servercode nodig
- Eenvoudige implementatie
- Betrouwbare e-mail aflevering
- Spam bescherming
- Formulierinzendingen dashboard

## Beperkingen
- Er geldt een limiet op het aantal inzendingen per maand, afhankelijk van je abonnement.
- Voor zeer geavanceerde formulierlogica kan een eigen backend-oplossing meer flexibiliteit bieden.
