
import React from 'react';
import { Link } from 'react-router-dom';

const nearbyMap: Record<string, string[]> = {
  Utrecht: ['Nieuwegein', 'Amersfoort', 'Hilversum'],
  Amersfoort: ['Utrecht', 'Ede', 'Hilversum'],
  Amsterdam: ['Amstelveen', 'Haarlem', 'Zaanstad'],
  Rotterdam: ['Gouda', 'Den Haag', 'Zoetermeer'],
  'Den Haag': ['Zoetermeer', 'Rotterdam', 'Leiden'],
  Arnhem: ['Ede', 'Nijmegen', 'Apeldoorn'],
  Nijmegen: ['Arnhem', 'Ede', 'Zwolle'],
  Zwolle: ['Apeldoorn', 'Nijmegen', 'Amersfoort'],
  Hilversum: ['Utrecht', 'Amersfoort', 'Amsterdam'],
  Amstelveen: ['Amsterdam', 'Haarlem', 'Zaanstad'],
  Ede: ['Arnhem', 'Veenendaal', 'Amersfoort'],
  Leiden: ['Den Haag', 'Haarlem', 'Zoetermeer'],
  Haarlem: ['Amsterdam', 'Amstelveen', 'Zaanstad'],
  Zaanstad: ['Amsterdam', 'Haarlem', 'Amstelveen'],
  Nieuwegein: ['Utrecht', 'Veenendaal', 'Gouda'],
  Hoofddorp: ['Haarlem', 'Amsterdam', 'Leiden'],
  Almere: ['Amsterdam', 'Hilversum', 'Utrecht'],
  Zoetermeer: ['Den Haag', 'Leiden', 'Gouda'],
  Gouda: ['Rotterdam', 'Zoetermeer', 'Leiden'],
  Veenendaal: ['Ede', 'Utrecht', 'Amersfoort'],
};

const slug = (city: string) =>
  `/energielabel-${city.toLowerCase().replace(/ä|á|à|â|ã/g, 'a').replace(/ë|é|è|ê/g, 'e').replace(/ï|í|ì|î/g, 'i').replace(/ö|ó|ò|ô|õ/g, 'o').replace(/ü|ú|ù|û/g, 'u').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-')}-aanvragen`;

interface Props {
  city: string;
}

const CityNearbyLinks: React.FC<Props> = ({ city }) => {
  const items = nearbyMap[city] || [];
  if (!items.length) return null;
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <h3 className="text-xl font-semibold mb-4">Ook populair in de buurt</h3>
        <div className="flex flex-wrap gap-3">
          {items.map((c) => (
            <Link
              key={c}
              to={slug(c)}
              className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm"
            >
              Energielabel {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityNearbyLinks;
