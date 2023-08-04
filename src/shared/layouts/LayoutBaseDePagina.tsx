import { Box } from '@mui/system';
import { Typography, useTheme, IconButton, Icon, useMediaQuery } from '@mui/material';
import { useDrawerContext } from '../contexts';
import { ReactNode } from 'react';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  barraDeFerramentas?: ReactNode;
  children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, barraDeFerramentas, titulo }) => {
    
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} display="flex" alignItems="center" height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>

        {smDown && (<IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>)}

        <Typography variant={ smDown ? 'h5' : mdDown ? 'h4' : 'h3' } whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && (<Box>
        {barraDeFerramentas}
      </Box>)}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};