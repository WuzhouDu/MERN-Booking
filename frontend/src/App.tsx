import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SIgnIn'
import { useAppContext } from './contexts/AppContext'
import AddHotel from './pages/AddHotel'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import Detail from './pages/Detail'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBooking'


function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        } />
        <Route path='/search' element={
          <Layout>
            <Search />
          </Layout>
        } />
        <Route path='/detail/:hotelId' element={
          <Layout>
            <Detail />
          </Layout>
        } />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
        {isLoggedIn && (
          <>
            <Route path='/hotel/:hotelId/booking' element={
              <Layout>
                <Booking />
              </Layout>}>
            </Route>
            <Route path='/add-hotel' element={
              <Layout>
                <AddHotel />
              </Layout>}>
            </Route>
            <Route path='/my-hotels' element={
              <Layout>
                <MyHotels />
              </Layout>}>
            </Route>
            <Route path='/edit-hotel/:hotelId' element={
              <Layout>
                <EditHotel />
              </Layout>}>
            </Route>
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />

          </>

        )}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
