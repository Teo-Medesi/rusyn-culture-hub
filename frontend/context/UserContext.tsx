import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import { ReactNode } from 'react';
import { User } from 'firebase/auth';

interface UserContextValue {
    user: User | null;
    isLoading: boolean;
}

const UserContext = createContext<UserContextValue>({user: null, isLoading: true});

// TO-DO use middleware to redirect user from sign in and sign up instead of getRedirectResults() 
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<UserContextValue>({user: null, isLoading: true});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(current => { return {...current, user: authUser, isLoading: false} });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG) console.log(user);
  }, [user])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};