"use client"

import { Brand, Watch } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import DataRowAction from "@/components/watches/data-row-action"
import Container from '@/components/container'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import AddWatch from '@/components/watches/add-watch'
import { DataTable } from '@/components/watches/datatable'
import watchAPI from '@/lib/axiosConfig'
import { useEffect, useState } from 'react'

export default function ManageWatch() {
  const [watches, setWatches] = useState<Watch[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchWatches()
  }, [])

  const fetchWatches = async () => {
    const response = await watchAPI.get('/watches') // Adjust the URL to your API endpoint
    setWatches(response.data)
  }

  const handleSuccess = () => {
    fetchWatches()
    setDialogOpen(false)
  }

  const handleOpenChange = () => {
    setDialogOpen(!dialogOpen)
  }

  // Define columns with handleSuccess in scope
  const columns: ColumnDef<Watch>[] = [
    {
      accessorKey: "watchName",
      header: () => <div className="text-center">Watch Name</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("watchName")}</div>
      },
    },
    {
      accessorKey: "image",
      header: () => <div className="text-center">Image</div>,
      cell: ({ row }) => {
        return <div className="flex justify-center"><img src={row.getValue('image')} alt="ảnh đồng hồ" className="rounded-md text-center font-medium h-20 w-30 overflow-hidden" /></div>
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-center">Price</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue('price')}$</div>
      },
    },
    {
      accessorKey: "Automatic",
      header: () => <div className="text-center">Automatic</div>,
      cell: ({ row }) => {
        return <div className="flex justify-center font-medium">
          {row.getValue('Automatic') ? <Check color="green"/> : <X color="red"/>}
        </div>
      },
    },
    {
      accessorKey: "watchDescription",
      header: () => <div className="text-center">Watch Description</div>,
      cell: ({ row }) => {
        return <div className="text-left font-medium flex justify-center">
          <p className="w-80">{row.getValue("watchDescription")}</p>
        </div>
      },
    },
    {
      accessorKey: "brand",
      header: () => <div className="text-center">Brand</div>,
      cell: ({ row }) => {
        const brandData: Brand = row.getValue("brand");
        return <div className="text-center font-medium">{brandData.brandName}</div>
      },
    },
    {
      id: "actions",
      // header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        return <div className="flex justify-center"><DataRowAction onSuccess={handleSuccess} row={row} /></div>
      }
    }
  ]

  return (
    <Container className='my-10'>
      <div className='text-4xl mb-5 text-center font-serif'>Manage Watch</div>
      <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <div className='flex justify-end my-3'><Button className='text-sm p-2'>Add watch</Button></div>
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
