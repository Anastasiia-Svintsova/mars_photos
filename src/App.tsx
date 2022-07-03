import { Box } from '@mui/material';
import { Routes, Route } from 'react-router';
import { Footer } from './components/Unknown/Footer';
import { Header } from './components/Unknown/Header';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

function App() {
  return (
    <Box display='flex' flexDirection="column" minHeight="100vh">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </Box>
  );
}

export default App;
