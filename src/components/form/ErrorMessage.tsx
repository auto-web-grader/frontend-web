import Typography from '@/components/Typography';

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c'
        className='!leading-tight text-danger-main text-sm'
      >
        {children}
      </Typography>
    </div>
  );
}
