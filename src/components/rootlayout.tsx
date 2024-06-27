import { Outlet } from 'react-router-dom'
import Header from '@/components/header'

function RootLayout() {
  return (
    <div className="h-screen relative">
      <Header />
      <div className="flex min-h-[70%] pt-10">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout