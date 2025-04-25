
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  user_type: 'farmer' | 'processor' | 'trader' | 'admin' | null;
  phone: string | null;
  address: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      // Use type assertion to tell TypeScript this is valid
      const { data, error } = await (supabase
        .from('profiles' as any)
        .select('*')
        .eq('id', userId)
        .single() as any);

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (data) {
        // Create a default profile if data doesn't match the expected shape
        const userProfile: UserProfile = {
          id: userId,
          full_name: data.full_name || null,
          avatar_url: data.avatar_url || null,
          user_type: data.user_type || 'farmer',
          phone: data.phone || null,
          address: data.address || null
        };
        
        setProfile(userProfile);
      }
    } catch (error: any) {
      console.error("Error in fetchProfile:", error.message);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "সফলভাবে লগআউট করা হয়েছে"
      });
    } catch (error: any) {
      toast({
        title: "লগআউট করার সময় ত্রুটি",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Using setTimeout to prevent potential deadlocks
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
