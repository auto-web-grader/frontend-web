import * as React from 'react';
import { IoClose } from 'react-icons/io5';

import 'yet-another-react-lightbox/styles.css';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';

import { FileWithPreview } from '@/types/form/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => void;
  readOnly?: boolean;
};

export default function FilePreview({
  file,
  deleteFile,
  readOnly,
}: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const fileSizeInBytes = file.size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  return (
    <>
      <li
        key={file.name}
        className='w-full flex items-center justify-between gap-2 px-3 py-1 bg-base-white ring-1 ring-inset ring-typo-inline rounded-xl border border-success-border bg-success-surface'
      >
        <div className='flex flex-row gap-1'>
          <Typography
            variant='c'
            weight='medium'
            className=' text-success-hover'
          >
            {file.name}
          </Typography>

          <Typography variant='c' weight='regular' className=' text-neutral-70'>
            (
            {fileSizeInMB < 1
              ? `${fileSizeInMB.toFixed(5)}`
              : fileSizeInMB.toFixed(2)}
            mb)
          </Typography>
        </div>

        {!readOnly && (
          <Button
            variant='outline'
            size='icon'
            onClick={handleDelete}
            className='text-neutral-70'
          >
            <IoClose className='h-4 w-4' />
          </Button>
        )}
      </li>
      <Typography
        variant='bt'
        className='flex-1 text-sm truncate text-success-main'
      >
        File berhasil terunggah.
      </Typography>
    </>
  );
}
