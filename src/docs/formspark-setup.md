
# Formspark Implementatie Handleiding

## Stap 1: Maak een Formspark account
1. Ga naar [Formspark](https://formspark.io/) en registreer een account.
2. Na registratie, maak een nieuw formulier aan.
3. Kopieer de formulier ID die Formspark genereert (het ziet eruit als een alfanumerieke reeks).

## Stap 2: Update de ContactForm.tsx code
1. Open het bestand `src/components/contact/ContactForm.tsx`.
2. Vervang de placeholder `FORMSPARK_FORM_ID` met uw eigen formulier ID:
   ```javascript
   const FORMSPARK_FORM_ID = "uw-formspark-form-id"; // Vervang dit met uw eigen ID
   ```

## Stap 3: Configureer e-mail notificaties in Formspark
1. Log in op uw Formspark dashboard.
2. Ga naar uw formulierinstellingen.
3. Configureer de e-mail notificaties:
   - Voeg het e-mailadres toe waar u formulierinzendingen wilt ontvangen.
   - Pas eventueel het onderwerp of andere e-mailinstellingen aan.

## Stap 4: Anti-spam instelling (optioneel maar aanbevolen)
1. In uw formulierinstellingen in Formspark, configureer de anti-spam instellingen.
2. Overweeg CAPTCHA in te schakelen voor extra beveiliging tegen spam.

## Stap 5: Testen
1. Test het formulier door een proefinzending te doen.
2. Controleer of u de e-mailnotificatie ontvangt.
3. Controleer of de gegevens correct worden weergegeven in uw Formspark dashboard.

## Voordelen van Formspark
- Geen servercode nodig
- Eenvoudige implementatie
- Betrouwbare e-mail aflevering
- Spam bescherming
- Formulierinzendingen dashboard

## Beperkingen
- Er geldt een limiet op het aantal inzendingen per maand, afhankelijk van uw abonnement.
- Voor zeer geavanceerde formulierlogica kan een eigen backend-oplossing meer flexibiliteit bieden.
