'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardLayout from '@/components/DashboardLayout';
import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import DropzoneInput from '@/components/form/DropzoneInput';
import { UploadIcon } from 'lucide-react';
import { z } from 'zod';
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
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

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
        'Prediksi Penjualan wajib diisi. dengan nomor yang valid.',
    })
  ),
  recommendation: z.string().min(1, {
    //berapa minimal string?
    message: 'Interpretasi dan Rekomendasi Hasil wajib diisi.',
  }),
});

export default function Question2() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <DashboardLayout>
      <section className='p-8'>
        <div
          className={cn(
            'flex flex-row justify-between items-center',
            'text-left'
          )}
        >
          <div className='space-y-1'>
            <Typography variant='h6' as='h6' weight='bold'>
              Submission Question 2
            </Typography>
          </div>
        </div>
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormItem className='max-w-xl items-center'>
              <FormLabel
                style={{ fontSize: '20px', fontWeight: 'bold' }}
                className='max-w-xl items-center'
              >
                Soal 1a
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
              style={{ marginBottom: '20px' }}
              className='max-w-xl items-center'
            >
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
              style={{ marginBottom: '20px' }}
              className='max-w-xl items-center'
            >
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
              style={{ marginBottom: '20px' }}
              className='max-w-xl items-center'
            >
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
                          console.log('Coefficient changed:', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </>
                )}
              />
            </FormItem>
            <FormItem className='max-w-xl items-center'>
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
              style={{ marginBottom: '20px' }}
              className='max-w-xl items-center'
            >
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
              style={{ marginBottom: '20px' }}
              className='max-w-xl items-center'
            >
              <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
      </section>
    </DashboardLayout>
  );
}
