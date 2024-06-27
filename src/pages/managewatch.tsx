import Container from '@/components/container'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import AddWatch from '@/components/watches/add-watch'
import { columns } from '@/components/watches/columns'
import { DataTable } from '@/components/watches/datatable'
import watchAPI from '@/lib/axiosConfig'
import { Watch } from '@/types'
import { useEffect, useState } from 'react'

export default function ManageWatch() {
  const [watches, setwatches] = useState<Watch[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchWatches()
    setDialogOpen(false)
  }, [])

  const fetchWatches = async () => {
    const response = await watchAPI.get('/watches') // Adjust the URL to your API endpoint
    setwatches(response.data)
  }

  const handleSuccess = () => {
    fetchWatches()
  }

  return (
    <Container className='my-10'>
      <div className='text-4xl mb-5 text-center font-serif'>Manage Watch</div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <div className='flex justify-end my-3'><Button onClick={() => setDialogOpen(true)} className='text-sm p-2'>Add watch</Button></div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-primary font-bold'>Add Watch</AlertDialogTitle>
            <AddWatch onSuccess={handleSuccess}/>
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <DataTable columns={columns} data={watches} />
    </Container>
  )
}
