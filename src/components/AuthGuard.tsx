import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthStore();


  

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate('/login', { state: { from: location } });
      } else if (!requireAuth && user) {
        navigate(location.state?.from || '/');
      }
    }
  }, [user, loading, requireAuth, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}