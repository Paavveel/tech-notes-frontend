export interface INoteApiResponse {
  _id: string;
  user: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  ticket: number;
  username: string;
  __v: string;
}
export interface INote extends Omit<INoteApiResponse, '_id'> {
  id: string;
}

export interface INewNote extends Pick<INote, 'user' | 'title' | 'text'> {}

export interface INoteUpdate
  extends Pick<INote, 'id' | 'user' | 'title' | 'text' | 'completed'> {}
