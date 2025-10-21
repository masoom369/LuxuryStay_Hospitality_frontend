import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home, RoomDetails, AboutUsPage, ContactUsPage } from './pages';
import { LoginPage, RegisterPage, PasswordResetPage } from './pages';
import { AuthProvider } from './context/AuthContext';

const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/room/:id'} element={<RoomDetails />} />
          <Route path={'/about-us'} element={<AboutUsPage />} />
          <Route path={'/contact-us'} element={<ContactUsPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/password-reset'} element={<PasswordResetPage />} />
          <Route path={'*'} element={<PageNotFound />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App