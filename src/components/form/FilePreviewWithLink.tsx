import * as React from 'react';
import { IoClose } from 'react-icons/io5';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';

// import { fetchImage } from '@/pages/events/open-campus/registration/hooks/mutation';

type FilePreviewProps = {
  title: string;
  link: string;
  deleteFile?: () => void;
  readOnly?: boolean;
};

export default function FilePreviewLink({
  link,
  title,
  deleteFile,
  readOnly,
}: FilePreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);

  const zoomRef = React.useRef(null);

  React.useEffect(() => {
    if (!link.startsWith('storage/')) return;
    // fetchImage(link, setImage);
  }, [link]);

  const isJPEG = title.slice(title.length - 4).toLowerCase() === 'jpeg';
  const titleWithFormat =
    title.length > 17
      ? title.split(/.(png|jpg|jpeg)/gi)[0].slice(0, 17) +
        '... ' +
        title.slice(title.length - (isJPEG ? 5 : 4))
      : title;
  const titleNoFormat =
    title.length > 20 ? title.slice(0, 20) + '.....' : title;

  return (
    <li
      key={title}
      className='w-full flex items-center justify-between gap-2 px-3 py-1 bg-base-white ring-1 ring-inset ring-typo-inline rounded-xl border border-success-border bg-success-surface'
    >
      <div onClick={() => setIsOpen(true)} className='cursor-pointer'>
        <Typography
          variant='c'
          className='flex-1 text-sm truncate text-neutral-90'
        >
          {['.jpg', '.png', '.jpeg'].some((x) =>
            title.toLowerCase().endsWith(x)
          )
            ? titleWithFormat
            : titleNoFormat}
        </Typography>
      </div>

      {!readOnly && (
        <IconButton
          icon={IoClose}
          onClick={deleteFile}
          // iconClassName='text-neutral-70'
        />
      )}

      <Lightbox
        open={isOpen}
        slides={[{ src: image ? image : link }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
        zoom={{ ref: zoomRef }}
        close={() => setIsOpen(false)}
      />
    </li>
  );
}
