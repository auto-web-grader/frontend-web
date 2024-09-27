export type fetchProps = {
  id: number;
  type: number;
  correctAnswer: number;
  totalAnswer: number;
  submitTime: string;
  user: { id:number, name: string, email:string }[]; // Correctly defining author as an array of objects with a name property
};
