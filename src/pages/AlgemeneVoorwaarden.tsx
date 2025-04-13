
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AlgemeneVoorwaarden = () => {
  useEffect(() => {
    document.title = "Algemene Voorwaarden | EPA Woninglabel";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-bold mb-6">Algemene Voorwaarden</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Laatste update: 13 april 2024</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 1 - Definities</h2>
            <p>In deze algemene voorwaarden wordt verstaan onder:</p>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li><strong>EPA Woninglabel:</strong> De opdrachtnemer, gevestigd te Amersfoort, ingeschreven bij de Kamer van Koophandel.</li>
              <li><strong>Opdrachtgever:</strong> De natuurlijke persoon of rechtspersoon die aan EPA Woninglabel opdracht heeft gegeven tot het verrichten van werkzaamheden.</li>
              <li><strong>Energielabel:</strong> Een classificatie conform de bepalingen in het Besluit Energieprestatie Gebouwen.</li>
              <li><strong>EPA-adviseur:</strong> Een persoon die werkzaam is voor EPA Woninglabel en gecertificeerd is voor het afgeven van een energielabel voor woningen.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 2 - Algemeen</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen EPA Woninglabel en opdrachtgevers.</li>
              <li>Eventuele afwijkingen op deze algemene voorwaarden zijn slechts geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.</li>
              <li>De toepasselijkheid van eventuele inkoop- of andere voorwaarden van opdrachtgever wordt uitdrukkelijk van de hand gewezen.</li>
              <li>Indien één of meerdere bepalingen in deze algemene voorwaarden nietig zijn of vernietigd mochten worden, blijven de overige bepalingen van deze algemene voorwaarden volledig van toepassing.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 3 - Aanbiedingen en offertes</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Alle aanbiedingen zijn vrijblijvend, tenzij in het aanbod een termijn voor aanvaarding is genoemd.</li>
              <li>De door EPA Woninglabel gemaakte offertes zijn geldig gedurende 30 dagen, tenzij anders aangegeven.</li>
              <li>De prijzen in de genoemde aanbiedingen en offertes zijn inclusief BTW en andere heffingen van overheidswege, alsmede eventuele in het kader van de overeenkomst te maken kosten, tenzij anders aangegeven.</li>
              <li>Een samengestelde prijsopgave verplicht EPA Woninglabel niet tot het verrichten van een gedeelte van de opdracht tegen een overeenkomstig deel van de opgegeven prijs.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 4 - Uitvoering van de overeenkomst</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>EPA Woninglabel zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren.</li>
              <li>EPA Woninglabel heeft het recht bepaalde werkzaamheden te laten verrichten door derden.</li>
              <li>De opdrachtgever draagt er zorg voor dat alle gegevens, waarvan EPA Woninglabel aangeeft dat deze noodzakelijk zijn of waarvan de opdrachtgever redelijkerwijs behoort te begrijpen dat deze noodzakelijk zijn voor het uitvoeren van de overeenkomst, tijdig aan EPA Woninglabel worden verstrekt.</li>
              <li>De opdrachtgever dient ervoor te zorgen dat de EPA-adviseur op het afgesproken tijdstip toegang heeft tot de woning en alle ruimtes die voor een correcte uitvoering van de opdracht noodzakelijk zijn.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 5 - Wijziging van de overeenkomst</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Indien tijdens de uitvoering van de overeenkomst blijkt dat het noodzakelijk is om de te verrichten werkzaamheden te wijzigen of aan te vullen, zullen partijen tijdig en in onderling overleg de overeenkomst dienovereenkomstig aanpassen.</li>
              <li>Indien partijen overeenkomen dat de overeenkomst wordt gewijzigd of aangevuld, kan het tijdstip van voltooiing van de uitvoering daardoor worden beïnvloed. EPA Woninglabel zal de opdrachtgever zo spoedig mogelijk hiervan op de hoogte stellen.</li>
              <li>Indien de wijziging van of aanvulling op de overeenkomst financiële en/of kwalitatieve consequenties zal hebben, zal EPA Woninglabel de opdrachtgever hierover tevoren inlichten.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 6 - Betaling</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Betaling dient te geschieden binnen 14 dagen na factuurdatum, op een door EPA Woninglabel aan te geven wijze in de valuta waarin is gedeclareerd.</li>
              <li>Na het verstrijken van 14 dagen na de factuurdatum is de opdrachtgever van rechtswege in verzuim; de opdrachtgever is vanaf het moment van in verzuim treden over het opeisbare bedrag een rente verschuldigd van 1% per maand, tenzij de wettelijke rente hoger is in welk geval de wettelijke rente geldt.</li>
              <li>In geval van liquidatie, faillissement, beslag of surseance van betaling van de opdrachtgever zijn de vorderingen van EPA Woninglabel op de opdrachtgever onmiddellijk opeisbaar.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 7 - Annulering</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Bij annulering van een afspraak door opdrachtgever binnen 24 uur voor de geplande afspraak is opdrachtgever 50% van de overeengekomen prijs verschuldigd.</li>
              <li>Indien de EPA-adviseur op het afgesproken tijdstip voor een gesloten deur staat, worden voorrijkosten in rekening gebracht á €75,- inclusief BTW.</li>
              <li>EPA Woninglabel heeft het recht om afspraken te verzetten in geval van overmacht, zonder hiervoor kosten in rekening te brengen.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 8 - Aansprakelijkheid</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Indien EPA Woninglabel aansprakelijk mocht zijn, dan is deze aansprakelijkheid beperkt tot hetgeen in deze bepaling is geregeld.</li>
              <li>EPA Woninglabel is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat EPA Woninglabel is uitgegaan van door of namens de opdrachtgever verstrekte onjuiste en/of onvolledige gegevens.</li>
              <li>EPA Woninglabel is uitsluitend aansprakelijk voor directe schade. Onder directe schade wordt uitsluitend verstaan de redelijke kosten ter vaststelling van de oorzaak en de omvang van de schade, voor zover de vaststelling betrekking heeft op schade in de zin van deze voorwaarden.</li>
              <li>EPA Woninglabel is nimmer aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.</li>
              <li>De aansprakelijkheid van EPA Woninglabel is in ieder geval steeds beperkt tot het bedrag van de uitkering van haar verzekeraar in voorkomend geval.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 9 - Overmacht</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Partijen zijn niet gehouden tot het nakomen van enige verplichting, indien zij daartoe gehinderd worden als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor hun rekening komt.</li>
              <li>Onder overmacht wordt in deze algemene voorwaarden verstaan naast hetgeen daaromtrent in de wet en jurisprudentie wordt begrepen, alle van buitenkomende oorzaken, voorzien of niet-voorzien, waarop EPA Woninglabel geen invloed kan uitoefenen, doch waardoor EPA Woninglabel niet in staat is de verplichtingen na te komen.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 10 - Klachten</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Klachten over de verrichte werkzaamheden dienen door de opdrachtgever binnen 8 dagen na ontdekking, doch uiterlijk binnen 14 dagen na voltooiing van de betreffende werkzaamheden schriftelijk te worden gemeld aan EPA Woninglabel.</li>
              <li>Indien een klacht gegrond is, zal EPA Woninglabel de werkzaamheden alsnog verrichten zoals overeengekomen, tenzij dit inmiddels voor de opdrachtgever aantoonbaar zinloos is geworden. Dit laatste dient door de opdrachtgever schriftelijk kenbaar te worden gemaakt.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 11 - Toepasselijk recht en geschillen</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Op alle rechtsbetrekkingen waarbij EPA Woninglabel partij is, is uitsluitend het Nederlands recht van toepassing.</li>
              <li>Partijen zullen eerst een beroep op de rechter doen nadat zij zich tot het uiterste hebben ingespannen een geschil in onderling overleg te beslechten.</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Artikel 12 - Wijziging, uitleg en vindplaats van de voorwaarden</h2>
            <ol className="list-decimal ml-6 mt-2 mb-4">
              <li>Deze voorwaarden zijn gedeponeerd bij de Kamer van Koophandel.</li>
              <li>Van toepassing is steeds de laatst gedeponeerde versie c.q. de versie zoals die gold ten tijde van het tot stand komen van de overeenkomst.</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlgemeneVoorwaarden;
