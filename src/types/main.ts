export type fetchProps = {
  id: number;
  type: number;
  correctTests: number;
  totalTests: number;
  submitTime: string;
  author: { name: string }[]; // Correctly defining author as an array of objects with a name property
};
