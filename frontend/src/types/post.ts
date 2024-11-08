export interface Post {
  id: string;
  forum: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  comments: number;
  author: {
    username: string;
    avatar: string;
  };
}
