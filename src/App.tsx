import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AppThemeProvider } from './shared/contexts';
import MenuLateral from './shared/components/menu-lateral/MenuLateral';


function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes/>
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
