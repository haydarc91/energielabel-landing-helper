import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Lock, AlertCircle, Mail, UserPlus } from 'lucide-react';
import { User, Session } from '@supabase/supabase-js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check if user has admin role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin')
        .single();
      
      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error('Je hebt geen admin rechten. Neem contact op met de beheerder.');
      }
      
      toast.success("Succesvol ingelogd als admin");
      navigate('/admin');
    } catch (error: any) {
      setError(error.message);
      toast.error(`Inloggen mislukt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Account aangemaakt! Neem contact op met de beheerder om admin rechten te krijgen.');
      setIsSignUp(false);
    } catch (error: any) {
      setError(error.message);
      toast.error(`Registreren mislukt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, redirect to admin page
  if (session && user) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Logo className="mb-4" />
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            {isSignUp ? 'Registreren' : 'Inloggen'} op het beheerderspaneel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp 
              ? 'Maak een account aan. Admin rechten worden toegekend door de beheerder.'
              : 'Log in met je admin account'
            }
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={isSignUp ? handleSignUp : handleLogin}>
            {isSignUp && (
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                  Volledige naam
                </label>
                <Input
                  id="full-name"
                  name="full-name"
                  type="text"
                  required
                  placeholder="Je volledige naam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                E-mailadres
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@epawoninglabel.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Wachtwoord
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                placeholder={isSignUp ? 'Minimaal 6 tekens' : 'Je wachtwoord'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                minLength={6}
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-epa-green hover:bg-epa-green-dark flex items-center justify-center gap-2"
            >
              {isSignUp ? <UserPlus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {loading ? 'Bezig...' : (isSignUp ? 'Registreren' : 'Inloggen')}
            </Button>
          </form>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-sm text-epa-green hover:text-epa-green-dark font-medium"
            >
              {isSignUp 
                ? 'Heb je al een account? Inloggen' 
                : 'Nog geen account? Registreren'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
