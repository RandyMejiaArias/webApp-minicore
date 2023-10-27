import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { minicoreTheme } from './minicoreTheme';


export const AppTheme = ({ children }) => (
  <ThemeProvider theme={minicoreTheme}>
    <CssBaseline />
    { children }
  </ThemeProvider>
)