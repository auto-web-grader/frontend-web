import { ReactNode } from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export default function HelperText({
  children,
  helperTextClassName,
}: {
  children: ReactNode;
  helperTextClassName?: string;
}) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c'
        className={clsxm(
          '!leading-tight text-[#687083] text-sm',
          helperTextClassName,
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
