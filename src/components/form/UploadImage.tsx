import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import * as React from 'react';
import { useCallback } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { GoUpload } from 'react-icons/go';

import Button from '@/components/buttons/Button';
import ErrorMessage from '@/components/form/ErrorMessage';
import FilePreviewLink from '@/components/form/FilePreviewWithLink';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import { baseURL } from '@/lib/api';
import clsxm from '@/lib/clsxm';
import { getToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';

type DropzoneStoreInputProps = {
  id: string;
  type:
    | 'bukti_share'
    | 'follow_ig'
    | 'follow_tiktok'
    | 'foto_diri'
    | 'kartu_identitas'
    | 'twibbon'
    | 'bukti_bayar';
  label?: string;
  subtitleText?: string | React.ReactNode;
  helperText?: string;
  hideError?: boolean;
  accept?: Accept;
  validation?: RegisterOptions;
  className?: string;
  acceptTypes?: string;
  location?: string;
  fileName?: string;
  event?: string;
  setImageUploadUrl?:
    | React.Dispatch<React.SetStateAction<string | null>>
    | undefined;
};

export default function DropzoneStoreInput({
  id,
  label,
  accept,
  className,
  location,
  type,
  helperText,
  subtitleText,
  acceptTypes = 'JPG, JPEG, atau PNG',
  hideError = false,
  fileName = '',
  event = 'OC',
  validation,
  setImageUploadUrl, //digunakan untuk documentUser upload file link
}: DropzoneStoreInputProps) {
  const methods = useFormContext();
  const {
    control,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = methods;

  const error = get(errors, id);

  const token = getToken();

  const dropzoneRef = React.useRef<HTMLDivElement>(null);
  const user = useAuthStore.useUser();

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const url = baseURL + `/images/lightbox/`;

  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string>(
    getValues(id) || '',
  );

  const [title, setTitle] = React.useState<string>('');

  const { mutate: handleUploadFile } = useMutationToast<void, FormData>(
    useMutation(async (data) => {
      await axios
        .post<ApiReturn<{ path_file: string }>>(
          baseURL + `/image/upload?event=${event}&fileType=${type}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          const data = res.data.data.path_file;
          setUploadedImageUrl(url + data + `?token=${token}`);
          setValue(id, data, {
            shouldValidate: true,
          });
          clearErrors(id);
          return res;
        });
    }),
  );

  const onDrop = useCallback(
    async <T extends File>(
      acceptedFiles: T[],
      rejectedFiles: FileRejection[],
    ) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, uploadedImageUrl ? uploadedImageUrl : '');
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
        const formdata = new FormData();
        formdata.append('file', acceptedFiles[0]);
        formdata.append('name', id);
        formdata.append('email', user ? user.email : '');
        formdata.append('location', location ? location : '');
        setTitle(acceptedFiles[0].name);
        handleUploadFile(formdata);
      }
    },

    [
      setValue,
      id,
      uploadedImageUrl,
      setError,
      user,
      location,
      handleUploadFile,
    ],
  );

  const onDelete = () => {
    setUploadedImageUrl('');
    setValue(id, '');
  };

  React.useEffect(() => {
    const value = getValues(id);
    if (value) {
      setUploadedImageUrl(value);
    }
  }, [getValues, id]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 1000000,
  });

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      <div>
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

            <div
              className={clsxm(
                'w-full cursor-pointer bg-base-white rounded-md',
                'flex flex-col items-center space-y-2 px-3 py-8',
                'border-dashed border-2 border-typo-inline',
                error
                  ? 'border-red group-focus:border-red'
                  : 'group-focus:border-typo-primary group-hover:border-typo-primary',
                className,
              )}
            >
              <div className='flex flex-col items-center gap-5'>
                <GoUpload className='w-8 h-8 text-neutral-70' />
                <Typography className='text-center text-neutral-70 text-sm'>
                  Letakkan file disini!
                </Typography>
                <Button leftIcon={AiOutlinePlus}>
                  <Typography variant='btn' className='text-neutral-10'>
                    Tambahkan File
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        )}
      />

      {!error && helperText && (
        <HelperText helperTextClassName='mt-3'>{helperText}</HelperText>
      )}
      <Typography variant='c' className='text-neutral-70 text-xs md:text-base'>
        Format file {acceptTypes}
      </Typography>
      {uploadedImageUrl !== '' &&
        setImageUploadUrl &&
        setImageUploadUrl(uploadedImageUrl ?? '')}
      {uploadedImageUrl !== '' && (
        <FilePreviewLink
          title={title || fileName}
          link={uploadedImageUrl}
          deleteFile={onDelete}
        />
      )}
      {!uploadedImageUrl && (
        <Typography
          variant='bt'
          className='text-neutral-80 text-xs md:text-base mt-3'
        >
          Belum ada file diunggah
        </Typography>
      )}
      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
