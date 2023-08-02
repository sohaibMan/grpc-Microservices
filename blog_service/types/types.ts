// those files should be auto generated from the proto files to by in sync with the proto files
export type BlogRequest = {
  blog: {
    title: string;
    content: string;
    authorId: number;
    name: string;
  };
};
export type BlogResponse = {
  blog: {
    title: string;
    content: string;
    authorId: number;
    name: string;
    id: number;
  };
};
