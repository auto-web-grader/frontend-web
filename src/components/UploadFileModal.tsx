import { UploadIcon } from 'lucide-react';

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

export function UploadFileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='p-5'>Add Submission</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Upload Zip</DialogTitle>
          <DialogDescription>
            Upload zip that contains the file asked by task
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'></div>
          <div className='grid grid-cols-4 items-center gap-4'></div>
        </div>
        <DialogFooter>
          <Button type='submit'>
            <UploadIcon className='mr-2 h-4 w-4' /> Upload File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
