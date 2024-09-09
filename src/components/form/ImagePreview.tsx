import React, { useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';

type CardPreview = {
  images: Array<{
    src: string;
    alt: string;
    label?: string;
  }>;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ImagePreview = ({
  images = [],
  width = 400,
  height = 300,
  className,
  imageClassName,
  ...props
}: CardPreview) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setIsOpen(true);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div {...props} className='cursor-pointer'>
        <div key={0} className={className} onClick={() => openLightbox(0)}>
          {isFile ? (
            <IconLink
              href={images[0]?.src}
              variant='outline-danger'
              icon={HiOutlineExternalLink}
              size='sm'
              iconClassName='text-neutral-80'
            />
          ) : (
            <NextImage
              src={images[0]?.src as string}
              layout='responsive'
              width={width}
              height={height}
              alt={images[0]?.alt}
              objectFit='contain'
              className={imageClassName}
              onClick={() => openLightbox(0)}
              onError={() => {
                setIsFile(true);
              }}
            />
          )}
        </div>
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={closeLightbox}
            slides={images.map((image) => ({
              src: image.src,
              alt: image.alt,
              title: `${image.label}`,
              description: '',
            }))}
            plugins={[Captions, Zoom, Download, Fullscreen, Counter]}
            animation={{
              zoom: 500,
              fade: 200,
            }}
            index={currentIndex}
            on={{
              view: ({ index: currentIndex }) => setCurrentIndex(currentIndex),
            }}
            noScroll={{ disabled: true }}
            captions={{
              descriptionTextAlign: 'start',
            }}
          />
        )}
      </div>
    </>
  );
};

export default ImagePreview;
