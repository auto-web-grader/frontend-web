import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import useAuthStore from '@/store/useAuthStore';

export function DialogLogout() {
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast();
  const logOut = useAuthStore.useLogout();
  const handleLogout = () => {
    // Navigate to the logout route
    toast({
      title: 'Logged out',
      description: 'Successfully Logged Out!',
    });
    logOut();
    router.push('/auth/logout');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
