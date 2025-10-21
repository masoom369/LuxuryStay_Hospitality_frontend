import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home } from './pages';
import AboutUsPage from './pages/public/AboutUsPage';
import ContactUsPage from './pages/public/ContactUsPage';
import FAQPage from './pages/public/FAQPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import RoomsPage from './pages/public/RoomsPage';
import RoomDetails from './pages/RoomDetails';
import HomePage from './pages/public/HomePage';

const App = () => {
  return (
    <main className=''>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<HomePage />} />
          <Route path={'/rooms'} element={<RoomsPage />} />
          <Route path={'/room/:id'} element={<RoomDetails />} />
          <Route path={'/about'} element={<AboutUsPage />} />
          <Route path={'/contact'} element={<ContactUsPage />} />
          <Route path={'/faq'} element={<FAQPage />} />
          <Route path={'/policy'} element={<PrivacyPolicyPage />} />
          <Route path={'*'} element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
};

export default App