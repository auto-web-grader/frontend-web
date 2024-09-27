'use client';

import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardLayout from '@/components/DashboardLayout';
import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import DropzoneInput from '@/components/form/DropzoneInput';
import { UploadIcon } from 'lucide-react';
import { z } from 'zod';
import { Loader } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import api from '@/lib/api';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  slope: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: 'Slope wajib diisi.',
      //invalid_type_error: 'Slope wajib diisi.',
      invalid_type_error: 'Slope wajib diisi dengan nomor yang valid.',
    })
  ),
  intercept: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: 'Intercept wajib diisi.',
      //invalid_type_error: 'Intercept wajib diisi.',
      invalid_type_error: 'Intercept wajib diisi dengan nomor yang valid.',
    })
  ),
  rSquared: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: 'R-Squared wajib diisi.',
      //invalid_type_error: 'R-Squared wajib diisi.',
      invalid_type_error: 'R-Squared wajib diisi dengan nomor yang valid.',
    })
  ),
  interpretation: z.string().min(1, {
    //berapa minimal string?
    message: 'Interpretation Hasil Regresi wajib diisi.',
  }),
  coefficient: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: 'Coefficient wajib diisi.',
      //invalid_type_error: 'Coefficient wajib diisi.',
      invalid_type_error: 'Coefficient wajib diisi dengan nomor yang valid.',
    })
  ),
  scatter: z.preprocess(
    (val) => {
      // Only check for FileList if running in the browser
      if (typeof window !== 'undefined' && val instanceof FileList) {
        return val;
      }
      return null; // Return null if not a valid FileList or if running server-side
    },
    z.instanceof(FileList).refine((files) => files && files.length > 0, {
      message: 'Scatter Plot file is required.', //still not working
    })
  ),
  prediction: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: 'Prediksi Penjualan wajib diisi.',
      //invalid_type_error: 'Prediksi Penjualan wajib diisi.',
      invalid_type_error:
        'Prediksi Penjualan wajib diisi dengan nomor yang valid.',
    })
  ),
  recommendation: z.string().min(1, {
    //berapa minimal string?
    message: 'Interpretasi dan Rekomendasi Hasil wajib diisi.',
  }),
});

export default function Question2() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gradingResult, setGradingResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slope: undefined,
      intercept: undefined,
      rSquared: undefined,
      interpretation: '',
      coefficient: undefined,
      scatter: undefined,
      prediction: undefined,
      recommendation: '',
    },
  });

  const { mutate: handleUpload, isPending } = useMutation<
    void,
    unknown,
    FormData
  >({
    mutationFn: async (data) => {
      try {
        const response = await api.post('/submission/gradeStatistic', data, {
          withCredentials: true,
        });
        setGradingResult(response.data.message);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast({
            title: 'Server Error',
            description: error.response?.data?.message || error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Upload failed',
            description: 'Error happening when grading',
            variant: 'destructive',
          });
        }
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCardVisible(true);
    setIsLoading(true);

    // simulate grading process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // set grading result
    //setGradingResult('hasilnya');
    setIsLoading(false);
  }

  return (
    // <DashboardLayout>
    <div className='w-max-screen relative min-h-screen bg-primary-surface'>
      <div
        className={cn(
          'bg-primary-surface',
          'flex w-full h-fit justify-center lg:gap-6',
          'px-4 py-5',
          'lg:px-10 lg:py-2'
        )}
      >
        <section
          className={cn(
            'bg-white shadow-xl p-10',
            'w-4/5 flex justify-center items-center',
            'rounded-2xl z-30'
          )}
        >
          <div className='w-full'>
            <div
              className={cn(
                'w-4/5 flex flex-row justify-between items-center',
                'text-left'
              )}
            >
              <div className='space-y-1'>
                <Typography
                  variant='h6'
                  as='h6'
                  weight='bold'
                  className='text-lg md:text-xl lg:text-2xl' // Adjusting text size
                >
                  Submission Question 2
                </Typography>
              </div>
            </div>
            <br />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormItem className='items-center'>
                  <FormLabel
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    className='items-center'
                  >
                    Soal 1a - Regresi Linier
                  </FormLabel>
                  <br />
                  <FormLabel style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    Slope
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='slope'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            placeholder='Isi jawaban'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log('Slope changed:', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                  <FormLabel style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    Intercept
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='intercept'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            placeholder='Isi jawaban'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log('Intercept changed:', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem
                  style={{ marginBottom: '18px' }}
                  className='items-center'
                >
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 1b - R-Squared
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='rSquared'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            placeholder='Isi jawaban'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log('R-Squared changed:', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem
                  style={{ marginBottom: '18px' }}
                  className='items-center'
                >
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 1c - Interpretasi Hasil Regresi
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='interpretation'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Textarea
                            placeholder='Isi jawaban'
                            className='resize-none'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(
                                'Interpretasi Hasil Regresi changed:',
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem
                  style={{ marginBottom: '18px' }}
                  className='items-center'
                >
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 2 - Coefficient
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='coefficient'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            placeholder='Isi jawaban'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(
                                'Coefficient changed:',
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>
                <FormItem className='items-center'>
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 3 - Scatter Plot Penjualan vs Biaya Iklan
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='scatter'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            id='scatter'
                            type='file'
                            accept='.png, .jpg, .jpeg'
                            onChange={(e) => {
                              field.onChange(e.target.files);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Hanya menerima file dengan format .png, .jpg, .jpeg.
                          Maximum ukuran file 100 MB.
                        </FormDescription>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem
                  style={{ marginBottom: '18px' }}
                  className='items-center'
                >
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 4a - Prediksi Penjualan
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='prediction'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Input
                            placeholder='Isi jawaban'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(
                                'Prediksi Penjualan changed:',
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem
                  style={{ marginBottom: '18px' }}
                  className='items-center'
                >
                  <FormLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Soal 4b - Interpretasi dan Rekomendasi Hasil
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='recommendation'
                    render={({ field }) => (
                      <>
                        <FormControl>
                          <Textarea
                            placeholder='Isi jawaban'
                            className='resize-none'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(
                                'Interpretasi dan Rekomendasi Hasil changed:',
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </>
                    )}
                  />
                </FormItem>

                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </div>
          {isCardVisible && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
              <Card className='w-[350px]'>
                <CardHeader>
                  <CardTitle>Hasil Grading</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className='flex justify-center items-center'>
                      <Loader className='animate-spin' size={24} />
                    </div>
                  ) : (
                    <div>{gradingResult}</div>
                  )}
                </CardContent>
                <CardFooter className='flex-1'>
                  <Button onClick={() => setIsCardVisible(false)}>Tutup</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>

    // </DashboardLayout>
  );
}
