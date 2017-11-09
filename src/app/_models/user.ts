export class User {
  constructor(
      public id: number,
      public username: string,
      public password: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public score: number,
      public level: string,
      public current: boolean
  ) {  }
}
