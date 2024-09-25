'use client';

import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import DashboardLayout from '@/components/DashboardLayout';
import { GradeModal } from '@/components/GradeModal';
import Typography from '@/components/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { fetchProps } from '@/types/main';

export default function Admin() {
  const { toast } = useToast();
  const [data, setData] = useState<fetchProps[]>([]);

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      // Set dummy data here instead of inside the component directly
      setData([
        {
          id: 1,
          type: 1,
          correctTests: 2,
          totalTests: 3,
          submitTime: '2022-02-22',
          author: [{ name: 'Author 1' }],
        },
        {
          id: 2,
          type: 2,
          correctTests: 1,
          totalTests: 3,
          submitTime: '2022-02-22',
          author: [{ name: 'Author 2' }],
        },
      ]);

      const response = await api.get('').then((res) => {
        return res.data;
      });

      setData(response);
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      toast({
        variant: 'destructive',
        title: 'Error on making request',
        description: errorMessage,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashboardLayout>
      <section className='p-8'>
        <div
          className={cn(
            'flex flex-row justify-between items-center',
            'text-left'
          )}
        >
          <div className='space-y-1'>
            <Typography variant='h6' as='h6' weight='bold'>
              You're Admin
            </Typography>
          </div>
        </div>
        <Table className={cn('mt-10')}>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Upload Time</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Problem Type</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell className='font-medium'>
                  {d.author[0]?.name}
                </TableCell>
                <TableCell>
                  <Typography
                    variant='p2'
                    className={cn('bg-slate-300 w-fit py-1 px-2 rounded-sm')}
                  >
                    {d.submitTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  {d.correctTests}/{d.totalTests}
                </TableCell>
                <TableCell>
                  <Typography
                    variant='p2'
                    className={cn('bg-cyan-300 w-fit py-1 px-2 rounded-sm')}
                  >
                    {d.type === 1 ? 'Website' : 'Reverse String'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <GradeModal id={d.id} disabled={d.totalTests != null} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DashboardLayout>
  );
}
