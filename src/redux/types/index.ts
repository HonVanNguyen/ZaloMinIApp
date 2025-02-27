export interface State {
  count: number;
  user: IFormInput | null;
  // Các state khác
}
// getter
export interface Getters {
  getCount: (state: State) => number;
  // Các getters khác
  getUser: (state: State) => UserData | null;
  // isLoggedIn: (state: State) => boolean;
  // isLoggedOut: (state: State) => boolean;
}
// actions
export interface Actions {
  increment: (context: { state: State }) => void;
  decrement: (context: { state: State }) => void;
  // Các actions khác
  register: (context: { state: State; userInfo: UserData }) => void;
  // login: (context: { state: State }, userInfo: UserData) => void;
  // logout: (context: { state: State }, userInfo: UserData) => void;
}

// user
export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
enum RoleEnum {
  admin = "admin",
  user = "user",
}
export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: RoleEnum;
  gender: GenderEnum;
}
export interface UserData {
  idZalo: string;
  name: string;
  avatar: string;
  role: string;
  phone?: string;
}
