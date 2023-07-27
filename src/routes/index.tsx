import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

function AppRoutes() {

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />}/>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
    </Routes>
  );
}

export default AppRoutes;