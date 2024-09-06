/* eslint-disable no-console */
import { UploadIcon } from 'lucide-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';

import DropzoneInput from '@/components/form/DropzoneInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
type SandboxForm = {
  submission: FileList;
};

export function UploadFileModal() {
  const { toast } = useToast();
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
    toast({
      description: 'Success sending file',
      variant: 'success',
    });
    console.log('Submitted file:', data.submission[0]);

    // Handle file submission logic here (e.g., upload)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='p-5'>Add Submission</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center'
          >
            <DialogHeader>
              <DialogTitle>Upload Zip</DialogTitle>
              <DialogDescription>
                Upload zip that contains the file asked by task
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='p-3 rounded-md shadow-md bg-gray-100'>
                <DropzoneInput
                  id='submission'
                  label='Upload your submission'
                  validation={{ required: 'Submission must be filled' }}
                  accept={{ 'application/zip': ['.zip'] }}
                  helperText='Maximum file size 10 Mb, and only .zip files are accepted'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'></div>
            </div>
            <DialogFooter>
              <Button type='submit'>
                <UploadIcon className='mr-2 h-4 w-4' /> Upload File
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
