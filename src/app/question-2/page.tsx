'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const isClient = typeof window !== 'undefined';

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
    isClient
      ? z.instanceof(FileList).refine((files) => files && files.length > 0, {
          message: 'Scatter Plot file is required.', //still not working
        })
      : z.any()
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
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        setGradingResult(response.data.message);
      } catch (error: any) {
        toast({
          title: 'Server Error',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCardVisible(true);
    setIsLoading(isPending);

    const formData = new FormData();

    formData.append('file', values.scatter[0]);
    formData.append('answer1', values.slope.toString());
    formData.append('answer2', values.intercept.toString());
    formData.append('answer3', values.rSquared.toString());
    formData.append('answer4', values.interpretation);
    formData.append('answer5', values.coefficient.toString());
    formData.append('answer6', values.prediction.toString());
    formData.append('answer7', values.recommendation);

    handleUpload(formData);

    setIsLoading(isPending);
  }

  return (
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
                            type='number'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value ?? ''}
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
                            type='number'
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value ?? ''}
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
                            type='number'
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value ?? ''}
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
                            }}
                            value={field.value ?? ''}
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
                            type='number'
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value ?? ''}
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
                          Maximum ukuran file 5 MB.
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
                            type='number'
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value ?? ''}
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
                            }}
                            value={field.value ?? ''}
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
