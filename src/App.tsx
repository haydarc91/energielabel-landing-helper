import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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

// Enhanced ScrollToTop component with debugging
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Force scroll to top with a small delay to ensure it happens after render
    setTimeout(() => {
      console.log(`Route changed to: ${pathname}, forcing scroll to top`);
      window.scrollTo(0, 0);
    }, 100);
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
        
        {/* Old routes with redirects to new SEO-friendly URLs */}
        <Route path="/werkgebieden/amersfoort" element={<Navigate to="/energielabel-amersfoort-aanvragen" replace />} />
        <Route path="/werkgebieden/amsterdam" element={<Navigate to="/energielabel-amsterdam-aanvragen" replace />} />
        <Route path="/werkgebieden/amstelveen" element={<Navigate to="/energielabel-amstelveen-aanvragen" replace />} />
        <Route path="/werkgebieden/apeldoorn" element={<Navigate to="/energielabel-apeldoorn-aanvragen" replace />} />
        <Route path="/werkgebieden/arnhem" element={<Navigate to="/energielabel-arnhem-aanvragen" replace />} />
        <Route path="/werkgebieden/den-haag" element={<Navigate to="/energielabel-den-haag-aanvragen" replace />} />
        <Route path="/werkgebieden/hilversum" element={<Navigate to="/energielabel-hilversum-aanvragen" replace />} />
        <Route path="/werkgebieden/nijmegen" element={<Navigate to="/energielabel-nijmegen-aanvragen" replace />} />
        <Route path="/werkgebieden/rotterdam" element={<Navigate to="/energielabel-rotterdam-aanvragen" replace />} />
        <Route path="/werkgebieden/utrecht" element={<Navigate to="/energielabel-utrecht-aanvragen" replace />} />
        <Route path="/werkgebieden/zwolle" element={<Navigate to="/energielabel-zwolle-aanvragen" replace />} />
        
        {/* New SEO-friendly routes */}
        <Route path="/energielabel-amersfoort-aanvragen" element={<AmersfoortPage />} />
        <Route path="/energielabel-amsterdam-aanvragen" element={<AmsterdamPage />} />
        <Route path="/energielabel-amstelveen-aanvragen" element={<AmstveenPage />} />
        <Route path="/energielabel-apeldoorn-aanvragen" element={<ApeldoornPage />} />
        <Route path="/energielabel-arnhem-aanvragen" element={<ArnhemPage />} />
        <Route path="/energielabel-den-haag-aanvragen" element={<DenHaagPage />} />
        <Route path="/energielabel-hilversum-aanvragen" element={<HilversumPage />} />
        <Route path="/energielabel-nijmegen-aanvragen" element={<NijmegenPage />} />
        <Route path="/energielabel-rotterdam-aanvragen" element={<RotterdamPage />} />
        <Route path="/energielabel-utrecht-aanvragen" element={<UtrechtPage />} />
        <Route path="/energielabel-zwolle-aanvragen" element={<ZwollePage />} />
        
        {/* Legacy route for AmersfoortLanding */}
        <Route path="/werkgebieden/amersfoort" element={<AmersfoortLanding />} />
        
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
