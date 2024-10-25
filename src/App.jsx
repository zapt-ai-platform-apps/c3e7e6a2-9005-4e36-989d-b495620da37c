import { createSignal, createEffect, onMount } from 'solid-js';
import { supabase } from './supabaseClient';
import { Routes, Route, useNavigate } from '@solidjs/router';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/dashboard');
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div class="h-full text-gray-800">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;