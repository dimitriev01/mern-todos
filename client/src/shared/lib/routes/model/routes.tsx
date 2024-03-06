export enum EnumRoutesName {
  MAIN = "main",
  REGISTER = "register",
  LOGIN = "login",
  DETAIL_TODO = "todo",
}

export const routes: Record<EnumRoutesName, string> = {
  [EnumRoutesName.MAIN]: "/",
  [EnumRoutesName.LOGIN]: "/login",
  [EnumRoutesName.REGISTER]: "/register",
  [EnumRoutesName.DETAIL_TODO]: "/todo/:id",
}
