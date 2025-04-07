
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CreateAdminUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create user with email and password
      const { data, error } = await supabase.auth.admin.createUser({
        email: 'haydarcay@gmail.com',
        password: 'VdbWwAf0!',
        email_confirm: true, // Auto-confirm email
        user_metadata: { role: 'admin' }
      });
      
      if (error) throw error;
      
      setSuccess(true);
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message || 'Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  // We'll monitor this page to see if we need to create the user
  // on first load (this is for internal use only)
  useEffect(() => {
    // You would ideally check if user already exists first
    // But for simplicity, we'll just show the button
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Create Admin User</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
              Admin user created successfully!
            </div>
          ) : (
            <>
              <p className="mb-4">Create admin user with:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Email: haydarcay@gmail.com</li>
                <li>Password: VdbWwAf0!</li>
              </ul>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                  {error}
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={createUser} 
            disabled={loading || success} 
            className="bg-epa-green hover:bg-epa-green-dark"
          >
            {loading ? 'Creating...' : success ? 'Created!' : 'Create Admin User'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateAdminUser;
