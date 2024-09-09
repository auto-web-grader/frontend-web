import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-screen relative min-h-screen bg-primary-surface'>
      <div
        className={cn(
          'bg-primary-surface',
          'flex h-fit lg:gap-6',
          'px-4 py-5',
          'lg:px-10 lg:py-2'
        )}
      >
        <section
          className={cn(
            'bg-white shadow-xl pb-10 lg:pb-0',
            'w-full',
            'rounded-2xl z-30'
          )}
        >
          <section tabIndex={-1}>{children}</section>
        </section>
      </div>
    </div>
  );
}
