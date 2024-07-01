import { Row } from '@tanstack/react-table'
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
} from '../ui/alert-dialog'
import UpdateWatch from './update-watch'
import { Watch } from '@/types'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import watchAPI from '@/lib/axiosConfig'
import { useState } from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  onSuccess: () => void
}

function DataRowAction<TData>({ row, onSuccess }: DataTableRowActionsProps<TData>) {
  const watch = row.original as Watch
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClickDelete = async (id: string) => {
    try {
      const response = await watchAPI.delete(`/watches/${id}`) // Adjust the URL to your API endpoint
      toast.success(response.data.message || 'Delete watch successfully')
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add watch')
    }
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    onSuccess()
  }

  const handleOpenChange = () => {
    dialogOpen === true  ? setDialogOpen(false) : setDialogOpen(true)
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='text-sm p-2 bg-red-500 hover:bg-red-600'>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you delete comment ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <DropdownMenuItem className='hover:bg-transparent'> */}
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* </DropdownMenuItem> */}
            {/* <DropdownMenuItem> */}
              <AlertDialogAction onClick={() => handleClickDelete(watch._id)} className='bg-red-500 hover:bg-red-600'>
                Delete
              </AlertDialogAction>
            {/* </DropdownMenuItem> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='w-3'></div>
      <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button className='text-sm p-2 bg-blue-600 hover:bg-blue-700'>Update</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-primary font-bold'>Update Watch</AlertDialogTitle>
            <UpdateWatch onSuccess={handleSuccess} watch={watch} />
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DataRowAction
