import { Attribute } from '../attribute/attribute';
export class User {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
    public email: string = '',
    public username: string = '',
    public password: string = '',
    public score: number = 0,
    public wallet: number = 0,
    public playthroughs: number = 0,
    public attributes: Array<Attribute> = [],
    public level: string = '',
    public admin: boolean = false,
    public nextLeech: number
  ) {  }
}
