'use client';

import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import api from '@/lib/api';
import clsxm from '@/lib/clsxm';
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
import { UploadFileModal } from '@/components/UploadFileModal';

import { fetchProps } from '@/types/main';

export default function Home() {
  const { toast } = useToast();
  const [data, setData] = useState<fetchProps[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await api
        .get('')
        .then((res) => {
          return res.data;
        })
        .catch((error: AxiosError) => {
          toast({
            variant: 'destructive',
            title: 'Error on making request',
            description: error.message,
          });
          return;
        });
      setData(response);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      });
    }
  }, [toast]); // Add toast to dependencies if it's defined in a context or hook

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
              Data Submission
            </Typography>
          </div>
          <div className='my-6 lg:my-0'>
            <UploadFileModal />
          </div>
        </div>
        <Table className={cn('mt-10')}>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Upload Time</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Tipe Soal</TableHead>
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
                <TableCell>
                  {/* if 1 then website if 2 then reverse string */}
                  <Typography
                    variant='p2'
                    className={clsxm('bg-cyan-300 w-fit py-1 px-2 rounded-sm')}
                  >
                    {d.type == 1 ? 'Website' : 'Reverse String'}
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
