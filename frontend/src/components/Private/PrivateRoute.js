import { Navigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';

const PrivateRoute = ({ children }) => {
  const session = supabase.auth.getSession();

  return session ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
