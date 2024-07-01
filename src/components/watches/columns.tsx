"use client"

import { Brand, Watch } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import DataRowAction from "@/components/watches/data-row-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Watch>[] = [
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
