import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import Hotels from "./pages/Hotels";
import HotelInfoPage from "./pages/HotelInfoPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import SavedListPage from "./pages/SavedListPage";
import BookingSummaryPage from "./pages/BookingSummaryPage";
import { Toaster } from "sonner";
import AuthProvider from "./auth/AuthProvider";
import RequiredAuth from "./auth/RequiredAuth";
import AdminPage from "./pages/AdminPage";
import ModifyModal from "./components/ModifyModal";

function App() {
  return (
    <>
      <Toaster richColors={true} position="top-center" />
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotelInfo" element={<HotelInfoPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            

            <Route element={<RequiredAuth allowedRoles = {['user', 'admin']}/>} >
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/savedList" element={<SavedListPage />} />
              <Route path="/bookingConfirmation" element={<BookingSummaryPage />}/>
            </Route>

            <Route element={<RequiredAuth allowedRoles = {['admin']}/>}  >
              <Route path = '/admin' element = {<AdminPage/>}/>
             
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
