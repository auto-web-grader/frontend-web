import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';

export type InputProps = {
  id: string;
  label?: string;
  helperText?: React.ReactNode;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  prefix?: string;
  suffix?: string;
  rightIcon?: IconType;
  leftIcon?: IconType;
  rightIconClassName?: string;
  leftIconClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  prefix,
  suffix,
  className,
  type = 'text',
  readOnly = false,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  rightIconClassName,
  leftIconClassName,
  helperTextClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const error = get(errors, id);

  return (
    <div className='w-full space-y-2'>
      {label && (
        <label htmlFor={id}>
          <Typography className=' text-neutral-100 font-medium text-sm'>
            {label}{' '}
            {validation?.required && (
              <span className='text-danger-main'>*</span>
            )}
          </Typography>
        </label>
      )}

      <div className='w-full flex relative gap-0'>
        <div
          className={clsxm(
            'absolute w-full h-full rounded-md ring-1 ring-[#D1D5DC] pointer-events-none'
          )}
        />

        {prefix && (
          <Typography
            variant='c'
            className='flex items-center px-3 bg-[#F9FAFB] text-[#687083] border-r text-sm w-min rounded-l-md'
          >
            {prefix}
          </Typography>
        )}

        <div
          className={clsxm(
            'relative w-full rounded-md',
            prefix && 'rounded-l-md',
            suffix && 'rounded-r-md'
          )}
        >
          {LeftIcon && (
            <div
              className={clsxm(
                'absolute top-0 left-0 h-full',
                'flex justify-center items-center pl-2.5',
                'text-neutral-100 text-lg md:text-xl',
                leftIconClassName
              )}
            >
              <LeftIcon />
            </div>
          )}

          <input
            {...register(id, validation)}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              'w-full h-full px-3 py-2 border-none rounded-md',
              [LeftIcon && 'pl-9', RightIcon && 'pr-9'],
              'focus:ring-2 focus:ring-inset',
              'bg-neutral-10 text-sm',
              'placeholder:text-[#9AA2B1] placeholder:text-sm focus:placeholder:text-[#092540]',
              readOnly && 'cursor-not-allowed',
              error
                ? 'border-none focus:ring-danger-main bg-danger-border-2 ring-2 ring-inset ring-danger-main placeholder:text-[#092540]'
                : 'focus:ring-2 focus:ring-[#3872c3]',
              prefix && 'rounded-l-none rounded-r-md',
              suffix && 'rounded-r-none rounded-l-md',
              prefix && suffix && 'rounded-none',
              className
            )}
            aria-describedby={id}
            {...rest}
          />

          {RightIcon && type !== 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex justify-center items-center pr-2.5',
                'text-neutral-100 text-lg md:text-xl',
                rightIconClassName
              )}
            >
              <RightIcon />
            </div>
          )}

          {type === 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex justify-center items-center pr-3',
                'text-neutral-100 text-lg md:text-xl',
                rightIconClassName
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </div>
          )}
        </div>

        {suffix && (
          <Typography
            variant='c'
            className='flex items-center px-3 bg-[#F9FAFB] text-[#687083] border-l text-sm w-min rounded-r-md'
          >
            {suffix}
          </Typography>
        )}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && (
        <HelperText helperTextClassName={helperTextClassName}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}
