import { Routes, Route } from 'react-router';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
