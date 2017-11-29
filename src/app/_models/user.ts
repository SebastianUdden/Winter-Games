export class User {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
    public email: string = '',
    public username: string = '',
    public password: string = '',
    public score: number = 0,
    public level: string = '',
    public current: boolean = false,
    public admin: boolean = false
  ) {  }
}
