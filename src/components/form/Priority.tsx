import { RegisterOptions } from 'react-hook-form';

import RadioButton from '@/components/RadioButton';
import Typography from '@/components/Typography';

export type PriorityInput = {
  id: string;
  label: string;
  description?: string;
  validation?: RegisterOptions;
  className?: string;
  leftLabel: string;
  rightLabel: string;
};

export default function Priority({
  id,
  label,
  description,
  validation,
  leftLabel,
  rightLabel,
}: PriorityInput) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id}>
        <Typography className=' text-neutral-100 font-medium text-sm'>
          {label}{' '}
          {validation?.required && <span className='text-danger-main'>*</span>}
        </Typography>
      </label>
      {description && (
        <Typography variant='c' className='text-neutral-70 mt-1'>
          {description}
        </Typography>
      )}
      <div className='mt-4 flex gap-10'>
        <Typography variant='c' className='text-neutral-100'>
          {leftLabel}
        </Typography>
        <div className='flex flex-row gap-8'>
          <RadioButton name={label} value='1' label='1' />
          <RadioButton name={label} value='2' label='2' />
          <RadioButton name={label} value='3' label='3' />
          <RadioButton name={label} value='4' label='4' />
          <RadioButton name={label} value='5' label='5' />
        </div>
        <Typography variant='c' className='text-neutral-100'>
          {rightLabel}
        </Typography>
      </div>
    </div>
  );
}
