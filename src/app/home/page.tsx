'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/DropzoneInput';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type SandboxForm = {
  submission: FileList;
};

export default function Home() {
  const methods = useForm<SandboxForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SandboxForm> = (data) => {
    if (data.submission && data.submission[0].type !== 'application/zip') {
      console.error('Only .zip files are allowed');
      return;
    }

    // Log the file data (e.g., file name)
    console.log('Submitted file:', data.submission[0]);

    // Handle file submission logic here (e.g., upload)
  };
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col p-3 gap-5 w-9/12 justify-center'>
        <div className='flex justify-between'>
          <Typography>Data Submission</Typography>
          {/* <Button variant='primary'>Submit Submission</Button> */}
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center items-center'
          >
            <div className='p-3 rounded-md shadow-md bg-gray-100'>
              <DropzoneInput
                id='submission'
                label='Upload your submission'
                subtitleText='Zip your submission first'
                validation={{ required: 'Submission must be filled' }}
                accept={{ 'application/zip': ['.zip'] }}
                helperText='Maximum file size 10 Mb, and only .zip files are accepted'
              />
            </div>
            <Button type='submit' variant='primary' className='mt-4'>
              Submit Submission
            </Button>
          </form>
        </FormProvider>
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
