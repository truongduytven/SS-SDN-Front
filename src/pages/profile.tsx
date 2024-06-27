// Profile.tsx
import React, { useEffect, useState } from 'react'
import { useUser } from '@/contexts/userContext'
import watchAPI from '@/lib/axiosConfig'
import Container from '@/components/container'
import { profileSchema } from '@/lib/schemas/profile'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'

type FormData = z.infer<typeof profileSchema>

interface CommentType {
  watchImage: string
  watchName: string
  content: string
  rating: number
}

const Profile: React.FC = () => {
  const { user, fetchUser } = useUser()
  const [comments, setComments] = useState<CommentType[]>([])
  const [isEdit, setIsEdit] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      membername: '',
      name: '',
      yob: 0,
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    const fectchData = async () => {
      if (user) {
        const response = await watchAPI.get(`/watches/comments/${user._id}`)
        setComments(response.data.comments)
      }
    }
    fectchData()
  }, [user])

  useEffect(() => {
    if (user) {
      form.reset({
        membername: user?.membername,
        name: user?.name,
        yob: user?.yob,
        password: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [user, form, isEdit])

  const handleUpdateProfile = () => {
    setIsEdit(!isEdit)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await watchAPI.put(`/members/${user?._id}`, data)
      toast.success(response.data.message || 'Profile updated successfully')
      fetchUser()
      setIsEdit(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  return (
    <Container>
      <a href='/' className='flex w-fit justify-start text-primary mt-10 hover:underline hover:font-semibold'> &larr; Back to Home</a>
      <div className='flex w-full h-full mb-10'>
        <div className='w-1/2 p-4 flex justify-start flex-col items-center'>
          <h1 className='text-6xl font-bold mb-4'>Profile</h1>
          {user && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 flex flex-col space-y-5 mt-5'>
                <FormField
                  control={form.control}
                  name='membername'
                  render={({ field }) => (
                    <>
                      <FormItem className='flex w-full items-center justify-between gap-10'>
                        <span className='w-[40%] font-semibold'>Member Name</span>
                        <Input type='text' className='w-[70%] border p-2 rounded' {...field} disabled={true} />
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <>
                      <FormItem className='flex w-full items-center justify-between gap-10'>
                        <span className='w-[40%] font-semibold'>Name</span>
                        <Input type='text' className='w-[70%] border p-2 rounded' {...field} disabled={!isEdit} />
                      </FormItem>
                      <FormMessage className='flex justify-end' />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name='yob'
                  render={({ field }) => (
                    <>
                      <FormItem className='flex w-full items-center justify-between gap-10'>
                        <span className='w-[40%] font-semibold'>Year of Birth</span>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className='w-[70%] border p-2 rounded'
                          disabled={!isEdit}
                        />
                      </FormItem>
                      <FormMessage className='flex justify-end' />
                    </>
                  )}
                />
                {isEdit && (
                  <>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <>
                          <FormItem className='flex w-full items-center justify-between gap-10'>
                            <span className='w-[40%] font-semibold'>Password</span>
                            <Input
                              type='password'
                              className='w-[70%] border p-2 rounded'
                              {...field}
                              disabled={!isEdit}
                            />
                          </FormItem>
                          <FormMessage className='flex justify-end' />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='newPassword'
                      render={({ field }) => (
                        <>
                          <FormItem className='flex w-full items-center justify-between gap-10'>
                            <span className='w-[40%] font-semibold'>New Password</span>
                            <Input
                              type='password'
                              className='w-[70%] border p-2 rounded'
                              {...field}
                              disabled={!isEdit}
                            />
                          </FormItem>
                          <FormMessage className='flex justify-end' />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <>
                          <FormItem className='flex w-full items-center justify-between gap-10'>
                            <span className='w-[40%] font-semibold'>Confirm Password</span>
                            <Input
                              type='password'
                              className='w-[70%] border p-2 rounded'
                              {...field}
                              disabled={!isEdit}
                            />
                          </FormItem>
                          <FormMessage className='flex justify-end' />
                        </>
                      )}
                    />
                    <div className='flex justify-end mt-2'>
                      <Button variant='outline' type='button' onClick={handleUpdateProfile} className='mr-4'>
                        Cancel
                      </Button>
                      <Button type='submit'>Submit</Button>
                    </div>
                  </>
                )}
              </form>
              {!isEdit && (
                <button onClick={handleUpdateProfile} className='mt-4 px-4 py-2 bg-primary text-white rounded'>
                  Update Profile
                </button>
              )}
            </Form>
          )}
        </div>
        <div className='w-1/2 p-4'>
          <h2 className='text-xl font-bold mb-4'>Comments by {user?.membername}</h2>
          {comments.length > 0 ? (
            <div className='grid grid-cols-1 gap-8 p-1'>
              {comments.map((comment, index) => (
                <div key={index} className='flex border p-2 rounded space-x-3'>
                  <div className=''>
                    <img
                      src={comment.watchImage}
                      className='w-[300px] h-[150px] object-cover overflow-hidden rounded-md'
                    />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>{comment.watchName}</h3>
                    <p><strong>Content:</strong> {comment.content}</p>
                    <div className='flex'>
                      {Array.from({ length: 3 }, (_, index) => (
                        <Star
                          key={index}
                          color={index < comment.rating ? 'gold' : 'lightgray'}
                          fill={index < comment.rating ? 'gold' : 'lightgray'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments found.</p>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Profile
