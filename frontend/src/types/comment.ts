// src/types/comment.ts

export interface Comment {
    id: string;
    username: string;
    avatar: string; 
    content: string; 
    likes: number;
    dislikes: number;
    timestamp: string; 
    replies?: Comment[];
  }
  