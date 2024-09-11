'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

import DropzoneInput from '@/components/form/DropzoneInput';
import Typography from '@/components/Typography';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SandboxForm = {
  submission: FileList;
  type: number;
};

const formSchema = z.object({
  submission: z.instanceof(FileList),
  type: z
    .number({
      required_error: 'Please Select Type of Assignment',
    })
    .gt(0, {
      message: 'Invalid Type',
    })
    .lte(2, {
      message: 'Invalid Type',
    }),
});

export function UploadFileModal() {
  const { toast } = useToast();

  const methods = useForm<SandboxForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const handleTypeChange = (value: string) => {
    setSelectedType(Number(value));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: handleUpload, isPending } = useMutation<
    void,
    unknown,
    FormData
  >({
    mutationFn: async (data) => {
      try {
        const res = await api.post('/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          toast({
            title: 'File uploaded successfully',
            typeof: 'success',
          });
          window.location.reload();
        }
      } catch (error: any) {
        toast({
          title: 'Upload failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  const onSubmit: SubmitHandler<SandboxForm> = async (data) => {
    if (!selectedType) {
      toast({
        title: 'Please select submission type!',
        variant: 'destructive',
      });
      return;
    }
    const file = data.submission[0];
    if (
      (selectedType === 1 && file.type !== 'application/zip') ||
      (selectedType === 2 && file.type !== 'text/javascript')
    ) {
      toast({
        title: `Only ${
          selectedType === 1 ? '.zip' : '.js'
        } files are allowed for the selected type`,
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', data.submission[0]);
    formData.append('type', selectedType.toString());
    handleUpload(formData);
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
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>
                Upload file that contains the answer asked by task
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='p-3 rounded-md shadow-md bg-gray-100'>
                <div className='items-center gap-4 shadow-md'>
                  <Select onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Question Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value='1'>Website</SelectItem>
                        <SelectItem value='2'>Reverse String</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <DropzoneInput
                  id='submission'
                  validation={{ required: 'Submission must be filled' }}
                  accept={
                    selectedType === 1
                      ? { 'application/zip': ['.zip'] }
                      : selectedType === 2
                      ? { 'application/javascript': ['.js'] }
                      : undefined
                  }
                  helperText={`Maximum file size 5 Mb, and only ${
                    selectedType === 1
                      ? '.zip files'
                      : selectedType === 2
                      ? '.js files'
                      : ''
                  } are accepted`}
                />
              </div>
            </div>
            <DialogFooter>
              <Button isLoading={isPending} textLoading='Uploading'>
                <UploadIcon className='mr-2 w-4 h-4' />
                <Typography variant='btn' className='text-neutral-10'>
                  Upload
                </Typography>
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
