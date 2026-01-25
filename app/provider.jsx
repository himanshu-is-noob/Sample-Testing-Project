"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on component mount
    const getCurrentUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await CreateNewUser(session.user);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await CreateNewUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const CreateNewUser = async (userData) => {
    try {
      // Check if user already exists
      let { data: existingUsers, error } = await supabase
        .from('Users')
        .select("*")
        .eq('email', userData.email)
        .single(); // Use single() to get just one record

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error("Error checking user:", error.message);
        return;
      }

      let userRecord;

      // Insert only if not exists
      if (!existingUsers) {
        const { data: newUser, error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
              email: userData.email,
              picture: userData.user_metadata?.picture
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting user:", insertError.message);
          return;
        }
        userRecord = newUser;
      } else {
        userRecord = existingUsers;
      }

      setUser(userRecord);
    } catch (error) {
      console.error("Error in CreateNewUser:", error);
    }
  };

  // Optional: Show loading state while checking authentication
  if (loading) {
    return <div className='flex items-center justify-center'>Loading...</div>;
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;

// Create Hook 
export const useUser = () => {
  const context = React.useContext(UserDetailContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a Provider');
  }
  
  return context;
}