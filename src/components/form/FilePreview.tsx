import 'yet-another-react-lightbox/styles.css';

import * as React from 'react';
import { IoClose } from 'react-icons/io5';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';
import { FileWithPreview } from '@/types/form/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
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

  const [isOpen, setIsOpen] = React.useState(false);

  const fileSizeInBytes = file.size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  const zoomRef = React.useRef(null);

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
            {'('}
            {fileSizeInMB < 1
              ? `${fileSizeInMB.toFixed(2)}`
              : fileSizeInMB.toFixed(2)}
            mb{')'}
          </Typography>
        </div>

        {!readOnly && (
          <IconButton
            icon={IoClose}
            onClick={handleDelete}
            iconClassName='text-neutral-70'
          />
        )}

        <Lightbox
          open={isOpen}
          slides={[{ src: file.preview }]}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          plugins={[Zoom]}
          zoom={{ ref: zoomRef }}
          close={() => setIsOpen(false)}
        />
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
