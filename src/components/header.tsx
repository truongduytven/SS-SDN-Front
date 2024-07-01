import LogoFull from '@/assets/logofull.png'
import { Link, useNavigate } from 'react-router-dom'
import Container from '@/components/container'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BookUser, LogOut } from 'lucide-react'
import { useUser } from '@/contexts/userContext'
import { toast } from 'sonner'
function Header() {
  const { user, logout, fetchUser } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    fetchUser()
    toast.success('Logged out successfully')
  }
  return (
    <header className='w-full shadow-md fixed top-0 z-50 bg-white'>
      <Container>
        <div className='w-full h-16 flex justify-between items-center flex-nowrap'>
          <div className='flex-1'>
            {user?.isAdmin && (
              <NavigationMenu>
                <NavigationMenuList className='flex gap-2 lg:gap-8 justify-center items-center'>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/watches'
                      className='relative text-black font-medium hover:text-primary cursor-pointer transition-all ease-in-out 
                      before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
                      after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'
                    >
                      Manage Watch
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/brands'
                      className='relative text-black font-medium hover:text-primary cursor-pointer transition-all ease-in-out 
  before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
  after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'
                    >
                      Manage Brand
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/members'
                      className='relative text-black font-medium hover:text-primary cursor-pointer transition-all ease-in-out 
  before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
  after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'
                    >
                      Manage Member
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          <div className='flex justify-center items-center h-full flex-1'>
            <Link to='/'>
              <img src={LogoFull} alt='Logo' className='h-12' />
            </Link>
          </div>
          {user ? (
            <div className='flex-1 flex justify-end items-center space-x-4'>
              <strong>Hi, {user.name}!</strong>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    className='h-10 w-10 cursor-pointer rounded-full object-cover border-2 border-primary hover:border-tertiary'
                    src='https://symbols.vn/wp-content/uploads/2022/02/Hinh-Canh-Cut-Cute-Chibi-dang-yeu.png'
                    alt='avatar'
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-fit'>
                  {/* <DropdownMenuLabel className='py-0'>{user.name}</DropdownMenuLabel> */}
                  <Link to='/profile'>
                    <DropdownMenuItem className='flex justify-start items-center gap-2 cursor-pointer'>
                      <BookUser className='w-5' />
                      Hồ sơ người dùng
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout} className='flex justify-start items-center gap-2 cursor-pointer'>
                      <LogOut className='w-5' />
                      Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className='flex-1 text-right'>
              <Link to='/login'>
                <button className='text-black rounded-md font-medium hover:before:bg-redborder-red-500 relative h-fit py-2 w-fit overflow-hidden bg-white px-3 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full'>
                  <p className='relative z-10'>Sign in</p>
                </button>
              </Link>
              <Link to='/register'>
                <button className='text-black rounded-md font-medium hover:before:bg-redborder-red-500 relative h-fit py-2 w-fit overflow-hidden bg-white px-3 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full'>
                  <p className='relative z-10'>Sign up</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
