import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type TextAreaProps = {
  id: string;
  label?: string;
  helperText?: React.ReactNode;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  ...rest
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='w-full space-y-2'>
      {label && (
        <label htmlFor={id}>
          <Typography className='text-neutral-100 font-medium text-sm'>
            {label}{' '}
            {validation?.required && (
              <span className='text-danger-main'>*</span>
            )}
          </Typography>
        </label>
      )}

      <textarea
        {...register(id, validation)}
        id={id}
        className={clsxm(
          'w-full px-3 py-2 border border-neutral-20 rounded-md focus:ring-2 focus:ring-[#3872c3] bg-neutral-10 text-sm placeholder:text-[#9AA2B1]',
          className,
          error &&
            'border-none focus:ring-danger-main bg-danger-border-2 ring-2 ring-inset ring-danger-main placeholder:text-[#092540]',
        )}
        aria-describedby={id}
        {...rest}
      />

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
