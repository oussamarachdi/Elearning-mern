export interface Course {
  _id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
  category?: string;
  price?: number;
  instructor: {
    _id: string;
    name: string;
  };
}
