
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // This is a simple authentication, in production you'd want to use a more secure method
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple hard-coded password for demo purposes
    // In production, you should use a proper authentication system
    if (password === 'epa2024admin') {
      localStorage.setItem('adminAuthenticated', 'true');
      onAuthenticated();
      toast({
        title: "Ingelogd",
        description: "Je bent succesvol ingelogd als beheerder",
      });
    } else {
      toast({
        title: "Fout",
        description: "Ongeldig wachtwoord",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Toegang</h1>
          <p className="mt-2 text-gray-600">Voer het wachtwoord in om door te gaan</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Wachtwoord
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="Voer wachtwoord in"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-epa-green hover:bg-epa-green/90"
            disabled={isLoading}
          >
            {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
