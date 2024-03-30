export interface Post {
  userId: string;
  _id: string;
  title: string;
  imgUrl: string;
  description: string;
  price: string;
  timeSinceCreation: string;
  likes: number
  users_liked:string[]
  created_at: Date;
}
