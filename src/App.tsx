import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import RootLayout from './components/rootlayout'
import WatchDetail from './pages/watchDetail'
import NotFoundPage from './pages/notfound'
import ManageWatch from './pages/managewatch'
import ManageBrand from './pages/managebrand'
import ManageMember from './pages/managemember'
import LoginPage from './pages/loginPage'
import ProtectedRoute from './pages/ProtectedRoute'
import RegisterPage from './pages/register'
import AdminRoute from './pages/AdminRoute'
import Profile from './pages/profile'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<Homepage />} />
        <Route element={<AdminRoute />}>
          <Route path='/watches' element={<ManageWatch />} />
          <Route path='/brands' element={<ManageBrand />} />
          <Route path='/members' element={<ManageMember />} />
        </Route>
        <Route path='/watches/:id' element={<WatchDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/notfound' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
