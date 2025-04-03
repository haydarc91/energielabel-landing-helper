
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-epa-gray">
          <CardHeader className="bg-epa-green text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <LockKeyhole className="h-6 w-6" /> Admin Toegang
            </CardTitle>
            <CardDescription className="text-epa-green-light">
              Voer het wachtwoord in om door te gaan naar het beheergedeelte
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                  Wachtwoord
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="Voer wachtwoord in"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-epa-green hover:bg-epa-green-dark transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4 text-xs text-gray-500">
            EPA Woninglabel Admin Panel &copy; {new Date().getFullYear()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
