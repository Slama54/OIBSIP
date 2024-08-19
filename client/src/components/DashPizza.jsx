import { Table } from 'flowbite-react'
import React from 'react'

export default function DashPizza() {
  return (
    <div className="overflow-x-auto mx-5 mt-5">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Photo</Table.HeadCell>
          <Table.HeadCell>price S</Table.HeadCell>
          <Table.HeadCell>Price M</Table.HeadCell>
          <Table.HeadCell>Price l</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
       
      </Table>
    </div>
  )
}
