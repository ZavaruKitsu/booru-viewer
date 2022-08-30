export interface ImageBoard {
  engine: string; // todo: add typing
  url: string;
  name: string;
  icon: string;
  options: object | null;
}

export interface Post {
  id: string;
  url: string;
  preview_image: string;
  full_image: string;
  tags: string[];
}
