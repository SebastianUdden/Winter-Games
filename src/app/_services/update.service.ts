import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../_models/user';

@Injectable()
export class UpdateService {
  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  private userSource = new BehaviorSubject<User>(new User('', '', '', '', '', 0, 0, 0, [], '', false, 0, 0, 0, []));
  currentUser = this.userSource.asObservable();

  private userScoreSource = new BehaviorSubject<number>(0);
  currentUserScore = this.userScoreSource.asObservable();

  private userLevelSource = new BehaviorSubject<string>('');
  currentUserLevel = this.userLevelSource.asObservable();

  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  changeUserScore(userScore: number) {
    this.userScoreSource.next(userScore);
  }

  changeUserLevel(userLevel: string) {
    this.userLevelSource.next(userLevel);
  }
}
