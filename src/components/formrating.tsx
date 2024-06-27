import { RatingSchema } from '@/lib/schemas/rating';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { toast } from 'sonner';
import watchAPI from '@/lib/axiosConfig';
import { useUser } from '@/contexts/userContext';

interface RatingProps {
  watchId: string | undefined;
  onSuccess: () => void;
}

function Formrating({ watchId, onSuccess }: RatingProps) {
  const { user } = useUser();
  const form = useForm<z.infer<typeof RatingSchema>>({
    resolver: zodResolver(RatingSchema),
    defaultValues: {
      content: '',
      rating: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof RatingSchema>) => {
    try {
      const response = await watchAPI.post(`/watches/comments/${watchId}`, {
        content: data.content,
        rating: data.rating,
        author: user?._id
      });
      onSuccess()
      form.reset()
      toast.success(response.data.message || 'Rating submitted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  return (
    <div className="w-full p-4 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full md:w-3/5 mr-4">
                <div className="flex justify-start space-x-3 pl-2 mb-2">
                  <span className="font-medium">Content</span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start justify-between md:items-end w-full md:w-2/5 space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="flex justify-start space-x-3 pl-2 mb-2">
                    <span className="font-medium">Rating</span>
                  </div>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto">
              Submit comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Formrating;
