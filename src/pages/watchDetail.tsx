import Container from '@/components/container'
import Formrating from '@/components/formrating'
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
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import UpdateRating from '@/components/updaterating'
import { useUser } from '@/contexts/userContext'
import watchAPI from '@/lib/axiosConfig'
import { averageStar } from '@/lib/utils'
import { Watch } from '@/types'
import axios from 'axios'
import { Settings, SquarePen, Star, Trash, Undo2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function WatchDetail() {
  const [watch, setWatch] = useState<Watch>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isComment, setIsComment] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const selectedWatch = useParams()
  const { user } = useUser()
  const navigate = useNavigate()
  
  
  const fetchWatch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/watches/${selectedWatch.id}`) // Adjust the URL to your API endpoint
      if(response.data.message.includes('failed') || response.data.message.includes('not found')) {
        navigate('/notfound')
      }
      setWatch(response.data.watch)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    const checkComment = () => {
      const existComment = watch?.comments.find((item) => item.author._id === user?._id)
      if (existComment) {
        setIsComment(true)
      }
    }
    checkComment()
  }, [watch, user])

  useEffect(() => {
    const checkAdmin = () => {
      if (user?.isAdmin) {
        setIsAdmin(true)
      }
    }
    checkAdmin()
  }, [watch, user])

  useEffect(() => {
    fetchWatch()
  }, [])

  const handleSuccess = () => {
    fetchWatch()
  }

  const handleDelete = async (commentId: string) => {
    try {
      const response = await watchAPI.delete(`/watches/comments/${commentId}`) // Adjust the URL to your API endpoint
      fetchWatch()
      toast.success(response.data.message || 'Comment deleted successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete comment')
    }
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  return (
    <Container>
      <div className='flex flex-col mt-10 space-y-10'>
        <Undo2 className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
        <div className='flex justify-evenly items-center'>
          <div className='w-1/3 object-cover overflow-hidden'>
            <img src={watch?.image} className='w-full h-full rounded-md object-cover' />
          </div>
          <div className='w-1/3 flex flex-col space-y-5'>
            <span className='flex items-center text-4xl font-bold'>
              {watch?.watchName}
              <Settings className='ml-2' />
            </span>
            <span>Brand: {watch?.brand.brandName}</span>
            <span>Price: {watch?.price}$</span>
            <span>Description: {watch?.watchDescription}</span>
            <span className='flex'>
              {Array.from({ length: 3 }, (_, index) => (
                <Star
                  key={index}
                  color={index < averageStar({ data: watch?.comments ?? [] }) ? 'gold' : 'lightgray'}
                  fill={index < averageStar({ data: watch?.comments ?? [] }) ? 'gold' : 'lightgray'}
                />
              ))}
            </span>
            {(!isAdmin && !isComment && user) && <Formrating onSuccess={handleSuccess} watchId={watch?._id} />}
          </div>
        </div>
        <hr></hr>
        <div>
          <div className='flex justify-center text-3xl font-bold mb-2'>Comments</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
            {watch?.comments && watch.comments.length > 0 ? (
              watch.comments.map((item, index) => (
                <Card key={index} className='shadow-md'>
                  <CardContent className='flex text-md flex-col aspect-auto justify-center p-3 space-y-4'>
                    <div className='flex justify-between'>
                      <span>
                        Author: <span className='font-bold'>{item.author.name}</span>
                      </span>
                    </div>
                    <span>Content: {item.content}</span>
                    <span className='flex'>
                      {Array.from({ length: 3 }, (_, index) => (
                        <Star
                          key={index}
                          color={index < item.rating ? 'gold' : 'lightgray'}
                          fill={index < item.rating ? 'gold' : 'lightgray'}
                        />
                      ))}
                    </span>
                    {item.author._id === user?._id && (
                      <div className='text-right space-x-3'>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant='outline' size='icon'>
                              <Trash color='red' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you delete comment ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your comment.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item._id)}
                                className='bg-red-500 hover:bg-red-600'
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant='outline' size='icon'>
                              <SquarePen color='blue' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                              <DialogTitle>Update comment</DialogTitle>
                            </DialogHeader>
                            <UpdateRating
                              onSuccess={handleSuccess}
                              commentId={item._id}
                              data={{ content: item.content, rating: item.rating }}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className='flex justify-center text-xl'>No comments in this watch</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default WatchDetail
