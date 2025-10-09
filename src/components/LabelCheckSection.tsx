import React from 'react';
import { CheckCircle, Shield, TrendingUp, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LabelCheckSection = () => {
  const scrollToContact = () => {
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Label Check Service: No-Cure No-Pay
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unieke dienst: We controleren eerst of een beter label mogelijk is. 
            Pas als we zeker weten dat het lukt, plannen we de inspectie in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Hoe werkt het?</h3>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>U vult het aanvraagformulier in met uw wensen (bijv. van label D naar A)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Wij beoordelen op afstand of het gewenste label haalbaar is</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Alleen als het lukt, plannen we de officiële inspectie in</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>U betaalt pas na de inspectie en uitwerking van het nieuwe label</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Euro className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Kosten</h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    Gratis vooraf screening
                  </p>
                  <p className="text-gray-600">
                    De beoordeling op afstand is volledig gratis en vrijblijvend
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-lg font-semibold text-blue-800 mb-2">
                    €150 incl. BTW extra bij succes
                  </p>
                  <p className="text-gray-600">
                    Alleen bovenop het normale tarief als het gewenste label behaald wordt
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Voorbeeld:</strong> Woning tot 150m² = €375 + €150 = €525 totaal (alleen bij succes)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Perfect voor wie zekerheid wil vooraf
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Wilt u alleen betalen als het gewenste label écht behaald wordt? 
            Dan is onze Label Check Service perfect voor u!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg"
            >
              <Shield className="mr-2 h-5 w-5" />
              Label Check aanvragen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabelCheckSection;
