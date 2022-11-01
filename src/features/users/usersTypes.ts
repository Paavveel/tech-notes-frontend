export interface IUser {
  id: string;
  username: string;
  roles: string[];
  active: boolean;
}

export interface IUserApiResponse {
  _id: string;
  username: string;
  roles: string[];
  active: boolean;
  __v: string;
}

export interface INewUser extends Pick<IUser, 'username' | 'roles'> {
  password: string;
}

export interface IUserUpdate extends IUser {
  password?: string;
}
