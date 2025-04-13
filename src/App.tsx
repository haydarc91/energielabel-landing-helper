
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Werkgebieden from "./pages/Werkgebieden";
import AmersfoortLanding from "./pages/AmersfoortLanding";
import PrivacyBeleid from "./pages/PrivacyBeleid";
import AlgemeneVoorwaarden from "./pages/AlgemeneVoorwaarden";
import Sitemap from "./pages/Sitemap";

// Import city landing pages
import AmersfoortPage from "./pages/cities/AmersfoortLanding";
import AmsterdamPage from "./pages/cities/AmsterdamLanding";
import AmstveenPage from "./pages/cities/AmsteveenLanding";
import ApeldoornPage from "./pages/cities/ApeldoornLanding";
import ArnhemPage from "./pages/cities/ArnhemLanding";
import DenHaagPage from "./pages/cities/DenHaagLanding";
import HilversumPage from "./pages/cities/HilversumLanding";
import NijmegenPage from "./pages/cities/NijmegenLanding";
import RotterdamPage from "./pages/cities/RotterdamLanding";
import UtrechtPage from "./pages/cities/UtrechtLanding";
import ZwollePage from "./pages/cities/ZwolleLanding";

// Admin pages
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import CreateAdminUser from "./pages/CreateAdminUser";

// Scroll to top when navigating to a new page
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/werkgebieden" element={<Werkgebieden />} />
        <Route path="/privacy-beleid" element={<PrivacyBeleid />} />
        <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
        {/* Legacy route for AmersfoortLanding */}
        <Route path="/werkgebieden/amersfoort" element={<AmersfoortLanding />} />
        
        {/* New city routes with updated components */}
        <Route path="/werkgebieden/amersfoort" element={<AmersfoortPage />} />
        <Route path="/werkgebieden/amsterdam" element={<AmsterdamPage />} />
        <Route path="/werkgebieden/amstelveen" element={<AmstveenPage />} />
        <Route path="/werkgebieden/apeldoorn" element={<ApeldoornPage />} />
        <Route path="/werkgebieden/arnhem" element={<ArnhemPage />} />
        <Route path="/werkgebieden/den-haag" element={<DenHaagPage />} />
        <Route path="/werkgebieden/hilversum" element={<HilversumPage />} />
        <Route path="/werkgebieden/nijmegen" element={<NijmegenPage />} />
        <Route path="/werkgebieden/rotterdam" element={<RotterdamPage />} />
        <Route path="/werkgebieden/utrecht" element={<UtrechtPage />} />
        <Route path="/werkgebieden/zwolle" element={<ZwollePage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-admin" element={<CreateAdminUser />} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
