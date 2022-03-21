import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css';
import { Login } from './Login.js';
import { Main } from './Main.js'
function App() {
  const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    displayName: user.displayName,
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
      return <h1>Loading...</h1>
  }

  if (!user) {
      return <Login />
  }

  return <Main />
}

export default App;
