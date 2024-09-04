import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Home</h1>
      <br />
      <div className='flex flex-col p-3 gap-5 w-9/12 justify-center'>
        <div className='flex justify-between'>
          <Button variant='primary'>Submit Submission</Button>
          <Button variant='primary'>Submit Submission</Button>
        </div>

        <Table className='bg-white rounded-md shadow-md'>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>NO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell>12/12/2024 12:12:12</TableCell>
              <TableCell>5/7</TableCell>
              <TableCell>
                <UnstyledLink href='/'>Download file</UnstyledLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
