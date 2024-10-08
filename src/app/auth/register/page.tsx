'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import api from '@/lib/api';
import { toast } from '@/hooks/use-toast';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordRepeated: string;
};

const formSchema = z.object({
  name: z.string().min(2, 'Nama tidak boleh kurang dari 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password tidak boleh kurang dari 8 karakter'),
  passwordRepeated: z
    .string()
    .min(8, 'Password tidak boleh kurang dari 8 karakter'),
});

export default function Register() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeated: '',
    },
  });

  const { mutate: handleUpload, isPending } = useMutation<
    void,
    unknown,
    FormData
  >({
    mutationFn: async (data) => {
      try {
        return await api
          .post('/auth/register', data)
          .then((res) => {
            toast({
              title: 'Successfully Signed Up',
              description:
                'Sign up is successful, redirecting you to Login Page',
            });
            router.push('/auth/login');
          })
          .catch((error) => {
            if (error.status == 400) {
              toast({
                title: 'Error',
                description: error.response.data.message,
                variant: 'destructive',
              });
              // error to form
              form.setError('password', {
                message: error.response.data.errors.name,
              });
              return;
            }
            toast({
              title: 'Error when Sending to API',
              description: error.response?.data?.message || error.message,
              variant: 'destructive',
            });
          });
      } catch (error: any) {
        toast({
          title: 'Error when Signed Up',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      }
    },
  });

  function onSubmitHandler(data: z.infer<typeof formSchema>) {
    if (data.password !== data.passwordRepeated) {
      form.setError('passwordRepeated', {
        message: 'Passwords do not match',
      });
      toast({
        title: 'Error',
        description: 'Password tidak sama',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }

    const dataForm = new FormData();
    dataForm.append('name', data.name);
    dataForm.append('email', data.email);
    dataForm.append('password', data.password);
    handleUpload(dataForm);
  }

  return (
    <section className='bg-slate-500 h-full w-screen flex flex-col lg:flex-row'>
      <div className='bg-neutral-100 w-full lg:w-[40%] h-screen py-20 flex flex-col justify-center items-center'>
        <div className='w-[315px] md:w-[420px] lg:w-full [@media(max-width:350px)]:w-[250px] lg:px-14 xl:px-24'>
          <div className='space-y-3 w-full max-w-sm'>
            <Typography as='h4' variant='h4' weight='bold' className='text-4xl'>
              Sign Up
            </Typography>
            <Typography as='p' variant='p' weight='regular'>
              Silahkan masukkan data diri anda untuk membuat akun baru
            </Typography>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className='mt-8 lg:mt-12 space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Masukkan Nama Anda</FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        placeholder='Masukkan Nama'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        placeholder='Masukkan email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id='password'
                        placeholder='Masukkan password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordRepeated'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ulangi Password</FormLabel>
                    <FormControl>
                      <Input
                        id='repeatedPassword'
                        placeholder='Masukkan kembali password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                size='lg'
                isLoading={isPending}
                className='w-full py-3'
              >
                <Typography variant='btn' weight='semibold'>
                  Buat Akun
                </Typography>
              </Button>
            </form>
            <div className='w-full flex justify-end mt-2'>
              <Link href='/auth/login'>
                <Typography variant='p3' className='text-blue-500 '>
                  Have accout? Login
                </Typography>
              </Link>
            </div>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
