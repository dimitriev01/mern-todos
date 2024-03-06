export interface IUser {
  email: string
  password: string
}

export interface ILoginResponse {
  email: string
  message: string
  status: "ok"
  token: string
  userId: string
}

export interface IRegisterResponse {
  message: string
  status: "ok"
}

export interface IRegisterResponse extends IUser {}
