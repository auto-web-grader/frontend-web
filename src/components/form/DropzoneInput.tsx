import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { GoUpload } from 'react-icons/go';

import clsxm from '@/lib/clsxm';

import ErrorMessage from '@/components/form/ErrorMessage';
import FilePreview from '@/components/form/FilePreview';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';

import { FileWithPreview } from '@/types/form/dropzone';

export type DropzoneInputProps = {
  id: string;
  label?: string;
  subtitleText?: string | React.ReactNode;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  accept?: Accept;
  acceptTypes?: string;
  maxFiles?: number;
  className?: string;
};

export default function DropzoneInput({
  id,
  label,
  subtitleText,
  helperText,
  hideError = false,
  validation,
  accept = { 'application/zip': ['.zip'] },
  acceptTypes = '.zip',
  maxFiles = 1,
  className,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  const dropzoneRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const [files, setFiles] = React.useState<FileWithPreview[]>(
    getValues(id) || []
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ?? [...files]);
        setError(id, {
          type: 'manual',
          message:
            rejectedFiles &&
            `${
              rejectedFiles[0].errors[0].code === 'file-too-large'
                ? 'File tidak boleh lebih dari 1MB'
                : rejectedFiles[0].errors[0].code === 'file-invalid-type'
                ? 'Tipe file tidak didukung'
                : rejectedFiles[0].errors[0].message
            }`,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          { shouldValidate: true }
        );

        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);

    setFiles(newFiles.length > 0 ? newFiles : []);
    setValue(id, newFiles.length > 0 ? newFiles : null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 10000009,
  });

  return (
    <div className='w-full rounded-md'>
      <div>
        {label && (
          <label htmlFor={id}>
            <Typography className='font-medium text-sm'>
              {label}{' '}
              {validation?.required && <span className='text-red-500'>*</span>}
            </Typography>
          </label>
        )}

        <Typography
          as='p'
          variant='p3'
          className='text-neutral-70 text-xs pb-2'
        >
          {subtitleText}
        </Typography>
      </div>
      <Controller
        control={control}
        name={id}
        rules={validation}
        render={() => (
          <div
            ref={dropzoneRef}
            className='focus:outline-none group'
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {files.length > 0 && files.length !== maxFiles ? (
              <div className='flex flex-col gap-2'>
                {files.map((file, index) => (
                  <FilePreview
                    key={index}
                    file={file}
                    deleteFile={deleteFile}
                  />
                ))}
                <div
                  className={clsxm(
                    'w-full cursor-pointer bg-base-white rounded-md',
                    'flex flex-col items-center space-y-2 px-3 py-8',
                    'border-dashed border-2 border-typo-inline',
                    error
                      ? 'border-red group-focus:border-red'
                      : 'group-focus:border-typo-primary group-hover:border-typo-primary',
                    className
                  )}
                >
                  <div className='flex flex-col items-center gap-5'>
                    <GoUpload className='w-8 h-8 text-neutral-70' />
                    <Typography className='text-center text-neutral-70 text-sm'>
                      Letakkan file disini!
                    </Typography>

                    <Button>
                      <AiOutlinePlus className='mr-2 w-4 h-4' />
                      <Typography variant='btn' className='text-neutral-10'>
                        Tambahkan File
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            ) : files.length > 0 && files.length === maxFiles ? (
              <div className='flex flex-col gap-2'>
                {files.map((file, index) => (
                  <FilePreview
                    key={index}
                    file={file}
                    deleteFile={deleteFile}
                  />
                ))}
              </div>
            ) : (
              <>
                <div
                  className={clsxm(
                    'w-full cursor-pointer bg-base-white rounded-md',
                    'flex flex-col items-center space-y-2 px-3 py-8',
                    'border-dashed border-2 border-typo-inline',
                    error
                      ? 'border-red group-focus:border-red'
                      : 'group-focus:border-typo-primary group-hover:border-typo-primary',
                    className
                  )}
                >
                  <div className='flex flex-col items-center gap-2 py-2'>
                    <GoUpload className='w-8 h-8 text-neutral-70' />
                    <Typography className='text-center text-neutral-70 text-sm'>
                      Letakkan file disini!
                    </Typography>

                    <Button>
                      <AiOutlinePlus className='mr-2 w-4 h-4' />
                      <Typography variant='btn' className='text-neutral-10'>
                        Tambahkan File
                      </Typography>
                    </Button>
                  </div>
                </div>

                <Typography
                  variant='c'
                  className='text-neutral-70 text-xs mt-2 md:text-base'
                >
                  Format file {acceptTypes}
                </Typography>
                {!error && helperText && <HelperText>{helperText}</HelperText>}
              </>
            )}
          </div>
        )}
      />
      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
