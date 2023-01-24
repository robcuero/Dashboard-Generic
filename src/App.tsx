import { useNavigate, useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { auth } from './guard/auth';
import { useEffect } from 'react';

function App() {
  const content = useRoutes(router);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth() === false) {
      navigate('/');
    }
  }, []);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
