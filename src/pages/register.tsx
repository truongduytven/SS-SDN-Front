import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RegisterSchema } from '@/lib/schemas/loginRegister'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type FormData = z.infer<typeof RegisterSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      membername: '',
      name: '',
      yob: 0,
      password: '',
    }
  })

  const onSubmit = async (data: FormData) => {
    const modifiedData = { ...data, yob: Number(data.yob) };
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', modifiedData)
        form.reset()
        toast.success(response.data.message)
        navigate('/login');
    } catch {
        toast.error('Failed to login')
    }
  }
  return (
    <section className='flex h-full w-full flex-wrap'>
      <div className='w-[50%] p-8'>
        <img
          src='https://img.pikbest.com/origin/06/06/14/63WpIkbEsTwuy.jpg!w700wp'
          className='hidden h-full w-full  rounded-3xl object-cover shadow-md lg:block'
        />
      </div>
      <div className='flex w-full items-center justify-center  p-8 lg:w-[50%] '>
        <div className='flex h-auto w-[50%] flex-col space-y-6'>
          <div>
            <h1 className="font-['SF Pro Rounded'] tracking-wider select-none text-center text-3xl font-semibold">
              Register Watch Nature
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <FormField
                  name='membername'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className='ml-2'>Member name</Label>
                      <FormControl>
                        <input
                          type='text'
                          className='h-12 w-full rounded-xl border border-gray-300 bg-slate-50 px-4 focus:border-slate-400 focus:outline-none'
                          placeholder='Input member name.....'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className='ml-2'>Name</Label>
                      <FormControl>
                        <input
                          type='text'
                          className='h-12 w-full rounded-xl border border-gray-300 bg-slate-50 px-4 focus:border-slate-400 focus:outline-none'
                          placeholder='Input name.....'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='yob'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className='ml-2'>Year of birth</Label>
                      <FormControl>
                        <Input
                          type='number'
                          className='h-12 w-full rounded-xl border border-gray-300 bg-slate-50 px-4 focus:border-slate-400 focus:outline-none'
                          placeholder='Input year of birth.....'
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='password'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className='ml-2'>Password</Label>
                      <FormControl>
                        <input
                          type='password'
                          className=' h-12 w-full rounded-xl border border-gray-300 bg-slate-50 px-4 focus:border-slate-400 focus:outline-none'
                          placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size='lg' type='submit' className='mt-12 w-full text-lg rounded-xl h-12'>
                Sign up
              </Button>
            </form>
          </Form>
          <div className='flex justify-center text-sm'>Do you already have an account ? <a href='/login' className='ml-2 text-green-600 underline'>Go to Login</a></div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
