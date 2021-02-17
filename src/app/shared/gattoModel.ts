export class Gatto {
  $key: string;
  userId: string;
  name: string;
  age: number;
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
