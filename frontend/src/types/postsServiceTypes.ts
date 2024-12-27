export interface SignUpParams {
  username: string;
  email: string;
  pass: string;
}

export interface LogInParams {
  username: string;
  pass: string;
}

export interface PostParams {
  content: string;
  userId: string;
}
