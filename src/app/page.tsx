import clsxm from '@/lib/clsxm';
import { cn } from '@/lib/utils';

import DashboardLayout from '@/components/DashboardLayout';
import Typography from '@/components/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UploadFileModal } from '@/components/UploadFileModal';

export default function Home() {
  const data = [
    {
      nama: 'Lionel Messi',
      upload_date: '2024-06-04 18:09:20',
      score: 3,
    },
  ];
  return (
    <DashboardLayout>
      <section className='p-8'>
        <div
          className={cn(
            'flex flex-col lg:flex-row justify-between items-center',
            'text-center lg:text-left'
          )}
        >
          <div className='space-y-1'>
            <Typography variant='h6' as='h6' weight='bold'>
              Data Submission
            </Typography>
          </div>
          <div className='my-10 lg:my-0'>
            <UploadFileModal />
          </div>
        </div>
        <Table className={cn('mt-10')}>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Upload Time</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.nama}>
                <TableCell className='font-medium'>{d.nama}</TableCell>
                <TableCell>
                  <Typography
                    variant='p2'
                    className={clsxm('bg-slate-300 w-fit py-1 px-2 rounded-sm')}
                  >
                    {d.upload_date}
                  </Typography>
                </TableCell>
                <TableCell>{d.score}/7</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DashboardLayout>
  );
}
