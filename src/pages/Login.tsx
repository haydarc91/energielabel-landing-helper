
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [directPassword, setDirectPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [directLoading, setDirectLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Succesvol ingelogd");
      navigate('/admin');
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setError(error.message);
      toast.error(`Inloggen mislukt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setDirectLoading(true);
    setError(null);
    
    try {
      // Simple hard-coded password for direct access
      if (directPassword === 'epa2024admin') {
        localStorage.setItem('adminAuthenticated', 'true');
        toast.success("Direct ingelogd als administrator");
        navigate('/admin');
      } else {
        throw new Error("Ongeldig wachtwoord");
      }
    } catch (error: any) {
      console.error('Direct login error:', error.message);
      setError(error.message);
      toast.error(`Inloggen mislukt: ${error.message}`);
    } finally {
      setDirectLoading(false);
    }
  };

  // If already logged in, redirect to admin page
  if (session) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Logo className="mb-4" />
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Inloggen op het beheerderspaneel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in om de website inhoud te beheren
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
          
          <div className="border-t border-b py-4">
            <p className="text-center text-gray-500 text-sm mb-4">Directe toegang</p>
            <form className="space-y-4" onSubmit={handleDirectLogin}>
              <div>
                <label htmlFor="direct-password" className="block text-sm font-medium text-gray-700">
                  Admin wachtwoord
                </label>
                <Input
                  id="direct-password"
                  name="direct-password"
                  type="password"
                  required
                  placeholder="Voer admin wachtwoord in"
                  value={directPassword}
                  onChange={(e) => setDirectPassword(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Gebruik het admin wachtwoord: epa2024admin</p>
              </div>
              <Button
                type="submit"
                disabled={directLoading}
                className="w-full bg-epa-green hover:bg-epa-green-dark"
              >
                {directLoading ? 'Bezig met inloggen...' : 'Direct inloggen'}
              </Button>
            </form>
          </div>

          <div>
            <p className="text-center text-gray-500 text-sm mb-4">OF</p>
            <p className="text-center text-gray-500 text-sm mb-4">Inloggen met Supabase account</p>
            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">E-mailadres</label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="E-mailadres"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Wachtwoord</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Wachtwoord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-epa-green hover:bg-epa-green-dark flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {loading ? 'Bezig met inloggen...' : 'Inloggen met account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
