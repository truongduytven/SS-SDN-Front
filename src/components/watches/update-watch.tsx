import { useForm } from 'react-hook-form'
import { Brand, Watch } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { watchSchema } from '@/lib/schemas/watch'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'
import { AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'
import watchAPI from '@/lib/axiosConfig'

type FormData = z.infer<typeof watchSchema>

interface UpdateWatchProps {
  watch: Watch
  onSuccess: () => void
}

function UpdateWatch({ watch, onSuccess }: UpdateWatchProps) {
  const [brands, setBrands] = useState<Brand[]>([])
  const form = useForm<z.infer<typeof watchSchema>>({
    resolver: zodResolver(watchSchema),
    defaultValues: {
      watchName: watch.watchName,
      image: watch.image,
      price: watch.price,
      Automatic: watch.Automatic,
      watchDescription: watch.watchDescription,
      brand: watch.brand._id
    }
  })
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await watchAPI.get('/brands') // Adjust the URL to your API endpoint
        setBrands(response.data)
        // form.reset()
      } catch (error) {
        toast.error('Failed to fetch brands'), console.log(error)
      }
    }
    fetchBrands()
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await watchAPI.put(`/watches/${watch._id}`, data)
      console.log(response)
      onSuccess()
      toast.success(response.data.message || 'Watch update successfully')
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to update watch')
    } 
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='watchName'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Name of watch</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <Input placeholder='watch name' {...field} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Image</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <Input placeholder='Image' {...field} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Price</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <Input
                      placeholder='Price'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='Automatic'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Automatic</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <div className='flex items-center space-x-3'>
                      <Switch
                        id='automatic'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        style={{
                          backgroundColor: field.value ? '#16A34A' : '#E5E7EB'
                        }}
                      />
                      <Label htmlFor='automatic'>{field.value ? 'Yes' : 'No'}</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='watchDescription'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Description</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <Textarea placeholder='watch name' {...field} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='flex w-full items-center justify-between gap-10'>
                <span className='w-[30%] font-semibold'>Brand</span>
                <div className='w-[70%]'>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select brand' />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand, index) => (
                          <SelectItem key={index} value={brand._id}>
                            {brand.brandName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className='flex justify-end space-x-4 mt-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction> */}
              <Button type='submit'>Submit</Button>
            {/* </AlertDialogAction> */}
          </div>
        </form>
      </Form>
    </>
  )
}

export default UpdateWatch
