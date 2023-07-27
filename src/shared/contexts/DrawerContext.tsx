// import { createContext, useCallback, useContext, useMemo, useState } from 'react';
// import { ThemeProvider } from '@mui/material';
// import { Box } from '@mui/system';

// import { DarkTheme, LightTheme } from './../themes';

// interface IDrawerContextData {
//   isDrawerOpen: boolean;
//   toggleDrawerOpen: () => void;
// }

// const DrawerContext = createContext({} as IDrawerContextData);

// export const useDrawerContext = () => {
//   return useContext(DrawerContext);
// };

// interface IAppThemeProviderProps {
//     children: React.ReactNode
// }

// export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
//   const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

//   const toggleTheme = useCallback(() => {
//     setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
//   }, []);

//   const theme = useMemo(() => {
//     if (themeName === 'light') return LightTheme;

//     return DarkTheme;
//   }, [themeName]);


//   return (
//     <DrawerContext.Provider value={{ themeName, toggleTheme }}>
//       <ThemeProvider theme={theme}>
//         <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
//           {children}
//         </Box>
//       </ThemeProvider>
//     </DrawerContext.Provider>
//   );
// };

import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
    children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
