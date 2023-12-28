export type Project = {
  name: string;
  description: string;
  url: string;
  image: {
    src: string;
    alt?: string;
    width: number;
    height: number;
  };
};
