
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return null;
}

export default Loading;
