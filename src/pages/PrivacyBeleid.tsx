
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyBeleid = () => {
  useEffect(() => {
    document.title = "Privacybeleid | EPA Woninglabel";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-bold mb-6">Privacybeleid</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Laatste update: 13 april 2024</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Inleiding</h2>
            <p>
              EPA Woninglabel, gevestigd aan Waterscheerling 93, 3824 GB Amersfoort, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Contactgegevens</h2>
            <p>
              Website: <a href="https://www.epawoninglabel.nl" className="text-epa-green hover:underline">www.epawoninglabel.nl</a><br />
              Adres: Waterscheerling 93, 3824 GB Amersfoort<br />
              Telefoon: 085-250 2302<br />
              E-mail: info@epawoninglabel.nl
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Persoonsgegevens die wij verwerken</h2>
            <p>
              EPA Woninglabel verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Voor- en achternaam</li>
              <li>Adresgegevens</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>Gegevens over uw woning voor het opstellen van een energielabel</li>
              <li>Overige persoonsgegevens die u actief verstrekt in correspondentie en telefonisch contact</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Bijzondere en/of gevoelige persoonsgegevens</h2>
            <p>
              Onze website en diensten hebben niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar, tenzij zij toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Doel en grondslag van gegevensverwerking</h2>
            <p>
              EPA Woninglabel verwerkt uw persoonsgegevens voor de volgende doelen:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Het opstellen van een officieel energielabel voor uw woning</li>
              <li>Het afhandelen van uw betaling</li>
              <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
              <li>U te informeren over (wijzigingen van) onze diensten en producten</li>
              <li>Om onze diensten bij u te kunnen uitvoeren</li>
              <li>Voor het registreren van het energielabel bij de Rijksdienst voor Ondernemend Nederland (RVO)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Geautomatiseerde besluitvorming</h2>
            <p>
              EPA Woninglabel neemt geen besluiten op basis van geautomatiseerde verwerkingen over zaken die (aanzienlijke) gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die worden genomen door computerprogramma's of -systemen, zonder dat daar een mens tussen zit.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Bewaartermijn</h2>
            <p>
              EPA Woninglabel bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen voor de volgende categorieën van persoonsgegevens:
            </p>
            <p>
              Klantgegevens: 7 jaar (fiscale bewaarplicht)<br />
              Gegevens energielabel: 10 jaar (geldigheidsduur energielabel)
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Delen van persoonsgegevens met derden</h2>
            <p>
              EPA Woninglabel deelt uw persoonsgegevens met verschillende derden als dit noodzakelijk is voor het uitvoeren van de overeenkomst en om te voldoen aan een eventuele wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens. EPA Woninglabel blijft verantwoordelijk voor deze verwerkingen.
            </p>
            <p>
              Wij delen gegevens met:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
              <li>Rijksdienst voor Ondernemend Nederland (RVO) - voor registratie van het energielabel</li>
              <li>Boekhoudsoftware - voor facturatie en administratie</li>
              <li>Email- en communicatieproviders - voor klantcontact</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Cookies, of vergelijkbare technieken</h2>
            <p>
              EPA Woninglabel gebruikt alleen technische, functionele cookies en analytische cookies die geen inbreuk maken op uw privacy. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak. Ze zorgen ervoor dat de website naar behoren werkt en onthouden bijvoorbeeld uw voorkeursinstellingen.
            </p>
            <p>
              U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de instellingen van uw browser verwijderen.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Gegevens inzien, aanpassen of verwijderen</h2>
            <p>
              U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door EPA Woninglabel en heeft u het recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een verzoek kunt indienen om de persoonsgegevens die wij van u beschikken in een computerbestand naar u of een ander, door u genoemde organisatie, te sturen.
            </p>
            <p>
              U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@epawoninglabel.nl.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Hoe wij persoonsgegevens beveiligen</h2>
            <p>
              EPA Woninglabel neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@epawoninglabel.nl.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Klachten</h2>
            <p>
              Mocht u een klacht hebben over de verwerking van uw persoonsgegevens dan vragen wij u hierover direct contact met ons op te nemen. Komen wij er samen met u niet uit dan vinden wij dit natuurlijk erg vervelend. U heeft altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, dit is de toezichthoudende autoriteit op het gebied van privacybescherming.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyBeleid;
