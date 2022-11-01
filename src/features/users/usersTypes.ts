export interface IUser {
  _id: string;
  username: string;
  roles: string[];
  active: boolean;
}

export interface INewUser extends Pick<IUser, 'username' | 'roles'> {
  password: string;
}

export interface IUserUpdate extends IUser {
  password?: string;
}
