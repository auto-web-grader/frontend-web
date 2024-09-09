'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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

import { fetchProps } from '@/types/main';

export default function Home() {
  const { toast } = useToast();
  const [data, setData] = useState<fetchProps[]>([]);

  // Memoize fetchData function
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      setData(response.data);
      // eslint-disable-next-line no-console
    } catch (error: any) {
      toast({
        description: error.message,
        title: 'Something went wrong!',
        variant: 'destructive',
      });
    }
  }, [toast]); // Add toast to dependencies if it's defined in a context or hook

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

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
              <TableRow key={d.id}>
                <TableCell className='font-medium'>{d.author.name}</TableCell>
                <TableCell>
                  <Typography
                    variant='p2'
                    className={clsxm('bg-slate-300 w-fit py-1 px-2 rounded-sm')}
                  >
                    {d.submitTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  {d.correctTests}/{d.totalTests}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DashboardLayout>
  );
}
