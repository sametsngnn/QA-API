import { Answer } from './answer';
import { User } from './user';

export class Question {
  _id!: string;
  title!: string;
  content!: string;
  user!: User;
  likeCount!: number;
  likes!: string[];
  answerCount!: number;
  answers!: Answer[];
  createdAt!: string;
  slug!: string;
  __v!: number;
}

export class QuestionResponse {
  success: boolean;
  count: number;
  pagination: {
    next: {
      page: number;
      limit: number;
    };
    previous: {
      page: number;
      limit: number;
    };
  };
  data: Question[];
  total: number;
}
