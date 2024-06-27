import { RatingSchema } from '@/lib/schemas/rating'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'
import watchAPI from '@/lib/axiosConfig'

interface UpdateRatingProps {
  data: {
    content: string
    rating: number
  }
  commentId: string
  onSuccess: () => void
}

function UpdateRating({ data, commentId, onSuccess }: UpdateRatingProps) {
  const form = useForm<z.infer<typeof RatingSchema>>({
    resolver: zodResolver(RatingSchema),
    defaultValues: {
      content: data.content,
      rating: data.rating
    }
  })

  const onSubmit = async (data: z.infer<typeof RatingSchema>) => {
    try {
      const response = await watchAPI.put(`/watches/comments/${commentId}`, data)
      onSuccess()
      toast.success(response.data.message || 'Rating updated successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update rating')
    }
  }

  return (
    // <div className='w-full p-4'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-between'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full md:w-3/5 mr-4'>
              <div className='flex justify-start space-x-3 pl-2 mb-2'>
                <span className='font-medium'>Content</span>
              </div>
              <FormControl>
                <Textarea placeholder='Tell us a little bit about yourself' className='resize-none h-32' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-start justify-between md:items-end w-full md:w-2/5 space-y-4'>
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <div className='flex justify-start space-x-3 pl-2 mb-2'>
                  <span className='font-medium'>Rating</span>
                </div>
                <FormControl>
                  <Select value={field.value.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select rating' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>1</SelectItem>
                      <SelectItem value='2'>2</SelectItem>
                      <SelectItem value='3'>3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type='submit' className='w-full md:w-auto'>
              Update comment
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
    // </div>
  )
}

export default UpdateRating
