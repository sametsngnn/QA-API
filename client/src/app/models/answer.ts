// localhost:5000/users

import { Question } from './question';
import { User } from './user';

export class Answer {
  _id?: string;
  content?: string;
  likes?: string[];
  user?: User;
  question?: Question;
  createdAt?: string;
  __v?: number;
}

export class AnswerResponse {
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
  data: {
    success: boolean;
    data: Answer[];
  };
  total: number;
}
