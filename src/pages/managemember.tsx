import Container from '@/components/container'
import { columns } from '@/components/members/columns'
import { DataTable } from '@/components/members/datatable'
import watchAPI from '@/lib/axiosConfig'
import { Member } from '@/types'
import { useEffect, useState } from 'react'

function ManageMember() {
  const [members, setMembers] = useState<Member[]>([])
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await watchAPI.get('/members') 
      setMembers(response.data)
    }
    fetchMembers()
  }, []) 
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center text-4xl w-screen mt-10 font-serif'>Member list</div>
      <Container className='mt-10 max-w-4xl'>
        <DataTable columns={columns} data={members} />
      </Container>
    </div>
  )
}

export default ManageMember
