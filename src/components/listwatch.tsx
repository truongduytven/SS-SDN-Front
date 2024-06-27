import { Card, CardContent } from '@/components/ui/card'
import { averageStar } from '@/lib/utils'
import { Watch } from '@/types'
import axios from 'axios'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  searchQuery: string
  selectedBrand: string | null
}

function Listwatch({ searchQuery, selectedBrand }: Props) {
  const [watches, setWatches] = useState<Watch[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/watches') // Adjust the URL to your API endpoint
        setWatches(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch watches')
        setLoading(false)
      }
    }
    fetchWatches()
  }, [])

  const filteredWatches = watches.filter((watch) => {
    // Filter by search query
    if (searchQuery && !watch.watchName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // Filter by selected brand
    if (selectedBrand && selectedBrand !== 'all' && watch.brand._id !== selectedBrand) {
      return false
    }
    return true
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      {filteredWatches.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4'>
          {filteredWatches.map((item, index) => (
            <Link key={index} to={`/watches/${item._id}`}>
              <Card className='shadow-md scale-100 transform transition duration-200 hover:border-primary hover:border-2 hover:scale-110'>
                <CardContent className='flex text-md flex-col aspect-auto items-center justify-center p-3 space-y-4'>
                  <img
                    src='https://cdn.tgdd.vn/Files/2020/03/11/1241419/c1_1280x960-800-resize.jpg'
                    className='rounded-md'
                  />
                  <div className='flex flex-col w-full space-y-2'>
                    <span className='text-2xl font-bold overflow-hidden'>{item.watchName}</span>
                    <span>Brand: {item.brand.brandName}</span>
                    <span className='flex'>
                      {Array.from({ length: 3 }, (_, index) => (
                        <Star
                          key={index}
                          color={index < averageStar({ data: item.comments }) ? 'gold' : 'lightgray'}
                          fill={index < averageStar({ data: item.comments }) ? 'gold' : 'lightgray'}
                        />
                      ))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className='w-full flex justify-center'>No watches found</div>
      )}
    </>
  )
}
export default Listwatch
