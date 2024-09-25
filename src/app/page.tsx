import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className='h-[85vh] mx-auto flex justify-center items-center gap-8'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Question 1</CardTitle>
          <CardDescription>Submit your answer for question 1.</CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter className='flex justify-end'>
          <Button asChild>
            <Link href='/question-1'>Submit</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Question 2</CardTitle>
          <CardDescription>Submit your answer for question 2.</CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter className='flex justify-end'>
          <Button asChild>
            <Link href='/question-2'>Submit</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
