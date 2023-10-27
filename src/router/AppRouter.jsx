import { Route, Routes, Navigate } from 'react-router';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { MinicoreRouter } from '../minicore/routes/MinicoreRouter';

export const AppRouter = () => {
  
  const { status } = useCheckAuth();

  if(status === 'checking')
    return <CheckingAuth />;
  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path='/*' element={<MinicoreRouter />}/>
        : <Route path='/auth/*' element={ <AuthRouter />} />
      }
      <Route path='/*' element={ <Navigate to='auth/login' />} />
    </Routes>
  )
}