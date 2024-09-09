import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <section className='bg-slate-500 h-full w-screen flex flex-col lg:flex-row'>
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
          {/* <FormProvider {...methods}> */}
          {/* <form */}
          {/* onSubmit={handleSubmit(onSubmit)} */}
          {/* className='mt-8 lg:mt-12 space-y-4' */}
          {/* > */}
          <div className='grid w-full max-w-sm items-center gap-1.5 my-2'>
            <Input id='email' placeholder='Masukkan email' type='email' />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5 my-2'>
            <Input
              id='password'
              placeholder='Masukkan password'
              type='password'
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
            <Button
              type='submit'
              size='lg'
              isLoading={false}
              className='w-full py-3'
            >
              <Typography variant='btn' weight='semibold'>
                Masuk
              </Typography>
            </Button>
          </div>

          {/* </form> */}
          {/* </FormProvider> */}
        </div>
      </div>
    </section>
  );
}
