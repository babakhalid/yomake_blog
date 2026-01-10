import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components';
import { HomePage, ArticlesPage, ArticlePage } from '@/pages';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
