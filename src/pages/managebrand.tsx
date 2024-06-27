import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import Container from '@/components/container'
import { Brand } from '@/types'
import { toast } from 'sonner'
import watchAPI from '@/lib/axiosConfig'

function ManageBrand() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [brandName, setBrandName] = useState('')

  const fetchBrands = async () => {
    try {
      const response = await watchAPI.get('/brands') // Adjust the URL to your API endpoint
      setBrands(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands()
  },[])

  const handleDelete = async (brandId: string) => {
    try {
      const response = await watchAPI.delete(`/brands/${brandId}`) // Adjust the URL to your API
      toast.success(response.data.message || 'Delete brand successfully')
      fetchBrands()
    } catch {
      toast.error('Fail to delete brand')
    }
    // Add delete logic here
  }

  const handleAddFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await watchAPI.post('/brands', { brandName })
      toast.success(response.data.message || 'Brand added successfully')
      fetchBrands()
      setBrandName('')
    } catch {
      toast.error('Failed to add brand')
      setBrandName('')
    }
  }
  const handleUpdateFormSubmit = async (brandId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await watchAPI.put(`/brands/${brandId}`, { brandName })
      toast.success(response.data.message || 'Brand added successfully')
      fetchBrands()
      setBrandName('')
    } catch {
      toast.error('Failed to add brand')
      setBrandName('')
    }
  }

  const handleClickUpdate = (brandName: string) => {
    setBrandName(brandName)
  }

  const handleCancel = () => {
    setBrandName('')
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <Container className='my-10'>
      <div className='w-full flex justify-center'>
        <div className='max-w-xl'>
          <div className='text-4xl mb-10 text-center font-serif'>Manage Brands</div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className='flex justify-end my-3'>
                <Button className='text-sm p-2'>Add Brand</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center text-primary font-bold'>Add Brand</AlertDialogTitle>
                <form onSubmit={handleAddFormSubmit}>
                  <div className='flex flex-col space-y-4'>
                    <label htmlFor='brandName'>Brand Name</label>
                    <input
                      type='text'
                      id='brandName'
                      name='brandName'
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className='border border-gray-300 rounded-md p-2'
                    />
                    <div className='flex justify-end space-x-4'>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button type='submit' className='bg-primary text-white p-2'>
                          Add Brand
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </div>
                </form>
              </AlertDialogHeader>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex space-x-32 text-xl justify-between items-center p-4 border rounded-md shadow-sm'>
              <div className='space-x-3'>
                <span>#</span>
                <span>Brand Name</span>
              </div>
              <div>
                <span>Actions</span>
              </div>
            </div>
            {brands.map((brand, index) => (
              <div
                key={brand._id}
                className='flex space-x-32 justify-between items-center p-4 border rounded-md shadow-sm'
              >
                <div className='space-x-3'>
                  <span className='text-xl'>{index + 1}.</span>
                  <span className='text-xl'>{brand.brandName}</span>
                </div>
                <div className='space-x-2'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size='sm' className='bg-red-500 hover:bg-red-600'>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this brand? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(brand._id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => handleClickUpdate(brand.brandName)} size='sm' className='bg-blue-600 hover:bg-blue-700'>
                        Update
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Update Brand</AlertDialogTitle>
                      </AlertDialogHeader>
                      <form onSubmit={(e) => handleUpdateFormSubmit(brand._id, e)}>
                        <div className='flex flex-col space-y-4'>
                          <label htmlFor='brandName'>Brand Name</label>
                          <input
                            type='text'
                            id='brandName'
                            name='brandName'
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className='border border-gray-300 rounded-md p-2'
                          />
                          <div className='flex justify-end space-x-4'>
                            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <Button type='submit' className='bg-primary text-white p-2'>
                                Update Brand
                              </Button>
                            </AlertDialogAction>
                          </div>
                        </div>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ManageBrand
