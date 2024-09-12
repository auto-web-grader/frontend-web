import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GradeModalProps {
  id: number;
  disabled: boolean;
}

export function GradeModal({ id, disabled }: GradeModalProps) {
  const { toast } = useToast();
  const { mutate: handleUpload, isPending } = useMutation<
    void,
    unknown,
    FormData
  >({
    mutationFn: async (data) => {
      try {
        const res = await api.post(`/grade?id=${id}`, data, {
          withCredentials: true,
        });
        if (res.status == 200) {
          toast({
            title: 'Grade Success',
            variant: 'success',
          });
          window.location.reload();
        }
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast({
            title: 'Server Error',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Upload failed',
            description: error.response.data,
            variant: 'destructive',
          });
        }
      }
    },
  });
  const onSubmit = async () => {
    const data = new FormData();
    handleUpload(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' disabled={disabled}>
          Actions
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Lakukan Penilaian</DialogTitle>
          <DialogDescription>Proses submisi untuk dinilai</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            onClick={onSubmit}
            disabled={isPending}
            isLoading={isPending}
          >
            {isPending ? 'Grading...' : 'Proses Penilaian'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
