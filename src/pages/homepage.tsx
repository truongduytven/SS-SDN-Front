import Container from '@/components/container'
import { Search } from 'lucide-react'
import Listwatch from '@/components/listwatch'
import { useEffect, useState } from 'react'
import { Brand } from '@/types'
import axios from 'axios'

function Homepage() {
  const [listbrand, setListBrand] = useState<Brand[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/brands') // Adjust the URL to your API endpoint
        setListBrand(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBrands()
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBrandFilterChange = (brand: string) => {
    // const brand = event.target.value
    console.log(brand)
    setSelectedBrand(brand)
  }

  return (
    <Container>
      <div className='flex flex-col my-10 space-y-10'>
        <h1 className='text-center text-4xl'>Welcome to the Watch Reviewer</h1>
        <div className='flex justify-center w-full space-x-5'>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
              <Search className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              id='simple-search'
              className='block w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-primary focus:ring-0'
              placeholder='Search by name....'
            />
          </div>
          <div className=''>
            <select
              id='brand'
              name='brand'
              className='h-full border px-2 rounded-md bg-[#F9FAFB] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              value={selectedBrand}
              onChange={(e) => handleBrandFilterChange(e.target.value)}
            >
              <option value='all'>All Brands</option>
              {listbrand.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Listwatch searchQuery={searchQuery} selectedBrand={selectedBrand} />
      </div>
    </Container>
  )
}

export default Homepage
