export class Gatto {
  $key: string;
  name: string;
  like: number = 0;
  dislike: number = 0;
  img: {
    name: string;
    url: string;
    size: number;
  };
  origin: string;
  peculiarity: string[];
  temperament: string;
  description: string;
}
