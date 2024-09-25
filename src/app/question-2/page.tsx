import DashboardLayout from '@/components/DashboardLayout';
import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Question2() {
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
          <div className='my-6 lg:my-0'>
            <Button className='p-5'>Add Submission</Button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
