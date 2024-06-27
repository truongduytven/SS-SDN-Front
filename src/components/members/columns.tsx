'use client'

import { Member } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Member>[] = [
  {
    accessorFn: (_row, index) => index + 1,
    id: 'index',
    header: () => <div className='text-center'>#</div>,
    cell: ({ getValue }) => {
      return <div className='text-center font-medium'>{getValue() as number}</div>
    }
  },
  {
    accessorKey: 'membername',
    header: () => <div className='text-center'>Member name</div>,
    cell: ({ row }) => {
      return <div className='text-center font-medium'>{row.getValue('membername')}</div>
    }
  },
  {
    accessorKey: 'name',
    header: () => <div className='text-center'>Name</div>,
    cell: ({ row }) => {
      return <div className='text-center font-medium'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'yob',
    header: () => <div className='text-center'>Year of birth</div>,
    cell: ({ row }) => {
      return <div className='text-center font-medium'>{row.getValue('yob')}</div>
    }
  }
]
