
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    propertyType: 'apartment',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Bedankt voor uw aanvraag! We nemen zo snel mogelijk contact met u op.");
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        propertyType: 'apartment',
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Vraag een offerte aan</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Vul het formulier in en ontvang binnen 24 uur een persoonlijke offerte voor uw energielabel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Naam
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="Uw volledige naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoonnummer
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="06 - 12345678"
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type woning
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring bg-white"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="terraced">Tussenwoning</option>
                    <option value="semi-detached">Hoekwoning</option>
                    <option value="detached">Vrijstaande woning</option>
                    <option value="other">Anders</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-5">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Adres
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                  placeholder="Straat, huisnummer, postcode en plaats"
                />
              </div>
              
              <div className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Bericht (optioneel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                  placeholder="Eventuele opmerkingen of vragen"
                />
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium ${
                    submitted 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-epa-green hover:bg-epa-green-dark text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>Verzenden...</>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" /> Verzonden
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> Offerte aanvragen
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Contact informatie</h3>
              
              <div className="space-y-4 text-gray-600 mb-6">
                <p>
                  <span className="font-medium block">Email:</span>
                  info@epawoninglabel.nl
                </p>
                <p>
                  <span className="font-medium block">Telefoon:</span>
                  020 - 123 4567
                </p>
                <p>
                  <span className="font-medium block">Openingstijden:</span>
                  Maandag t/m vrijdag: 9:00 - 17:00
                </p>
              </div>
              
              <div className="mt-auto">
                <h4 className="font-medium mb-3 text-lg">Werkgebied</h4>
                <p className="text-gray-600">
                  Wij zijn actief in heel Nederland en kunnen in elke provincie een energielabel verzorgen voor uw woning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
