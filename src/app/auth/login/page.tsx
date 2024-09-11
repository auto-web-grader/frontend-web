'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormData = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: handleUpload, isPending } = useMutation<
    void,
    unknown,
    FormData
  >({
    mutationFn: async (data) => {
      try {
        const response = await api
          .post('/login', data)
          .then((res) => {
            toast({
              title: 'Login successful',
            });
            redirect('/');
          })
          .catch((error) => {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
            });
          });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Signed In',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  function onSubmitHandler(data: z.infer<typeof formSchema>) {
    const dataForm = new FormData();
    dataForm.append('email', data.email);
    dataForm.append('password', data.password);
    handleUpload(dataForm);
  }
  return (
    <section className='bg-slate-500 h-full w-max-screen flex flex-col lg:flex-row'>
      <div className='bg-neutral-100 w-full lg:w-[40%] h-screen py-20 flex flex-col justify-center items-center'>
        <div className='w-[315px] md:w-[420px] lg:w-full [@media(max-width:350px)]:w-[250px] lg:px-14 xl:px-24'>
          <div className='space-y-3'>
            <Typography as='h4' variant='h4' weight='bold' className='text-4xl'>
              Sign in
            </Typography>
            <Typography as='p' variant='p' weight='regular'>
              Silahkan masukkan data diri anda
            </Typography>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className='mt-8 lg:mt-12 space-y-4'
            >
              <div className='grid w-full max-w-sm items-center gap-1.5 my-2'>
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
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5 my-2'>
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
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
                <Button
                  type='submit'
                  size='lg'
                  isLoading={isPending}
                  className='w-full py-3'
                >
                  <Typography variant='btn' weight='semibold'>
                    Masuk
                  </Typography>
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <Link href='/'>Hello</Link>
      </div>
    </section>
  );
}
function setCookie(token: any) {
  throw new Error('Function not implemented.');
}
