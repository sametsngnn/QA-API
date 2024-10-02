
// localhost:5000/users

export class Answer {
    _id: string;
    content: string;
    // Diğer yanıt bilgileri
}


export class AnswerResponse {
    success: boolean;
    count: number;
    pagination: {
      next: {
        page: number;
        limit: number;
      };
    };
    data: Answer[];
    total: number;
}