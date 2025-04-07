
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { supabase } from '@/integrations/supabase/client';
import CreateAdminUser from './pages/CreateAdminUser';
import Werkgebieden from './pages/Werkgebieden';

// Import all city landing pages
import AmersfoortLanding from './pages/cities/AmersfoortLanding';
import UtrechtLanding from './pages/cities/UtrechtLanding';
import AmsterdamLanding from './pages/cities/AmsterdamLanding';
import RotterdamLanding from './pages/cities/RotterdamLanding';
import DenHaagLanding from './pages/cities/DenHaagLanding';
import ApeldoornLanding from './pages/cities/ApeldoornLanding';
import ArnhemLanding from './pages/cities/ArnhemLanding';
import NijmegenLanding from './pages/cities/NijmegenLanding';
import HilversumLanding from './pages/cities/HilversumLanding';
import ZwolleLanding from './pages/cities/ZwolleLanding';
import AmsteveenLanding from './pages/cities/AmsteveenLanding';

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/werkgebieden" element={<Werkgebieden />} />
          
          {/* City landing pages */}
          <Route path="/werkgebieden/amersfoort" element={<AmersfoortLanding />} />
          <Route path="/werkgebieden/utrecht" element={<UtrechtLanding />} />
          <Route path="/werkgebieden/amsterdam" element={<AmsterdamLanding />} />
          <Route path="/werkgebieden/rotterdam" element={<RotterdamLanding />} />
          <Route path="/werkgebieden/den-haag" element={<DenHaagLanding />} />
          <Route path="/werkgebieden/apeldoorn" element={<ApeldoornLanding />} />
          <Route path="/werkgebieden/arnhem" element={<ArnhemLanding />} />
          <Route path="/werkgebieden/nijmegen" element={<NijmegenLanding />} />
          <Route path="/werkgebieden/hilversum" element={<HilversumLanding />} />
          <Route path="/werkgebieden/zwolle" element={<ZwolleLanding />} />
          <Route path="/werkgebieden/amstelveen" element={<AmsteveenLanding />} />
          
          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={session ? <Admin /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/create-admin"
            element={<CreateAdminUser />}
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
