
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Pagina niet gevonden | EPA Woninglabel";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-epa-green mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pagina niet gevonden</h2>
          <p className="text-gray-600 mb-8">
            De pagina die u probeert te bezoeken bestaat niet of is verplaatst.
            Gebruik de onderstaande links om terug te keren naar onze website.
          </p>
          
          <div className="space-y-4">
            <Link to="/" className="block w-full">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                <span>Terug naar de homepagina</span>
              </Button>
            </Link>
            
            <Link to="/werkgebieden" className="block w-full">
              <Button className="w-full bg-epa-green hover:bg-epa-green-dark flex items-center justify-center gap-2">
                <span>Bekijk onze werkgebieden</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/sitemap" className="text-sm text-epa-green hover:underline">
              Bekijk onze sitemap
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
