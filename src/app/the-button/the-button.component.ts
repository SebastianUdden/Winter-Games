import {
  Component, trigger, state, style,
  transition, animate, keyframes,
  OnInit, OnDestroy,
  ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';
import { UpdateService } from '../_services/update.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { UsersComponent } from '../users/users.component';
import { LightSwitchComponent } from '../light-switch/light-switch.component';
import { DiceComponent } from '../dice/dice.component';

@Component({
    selector: 'app-the-button',
    templateUrl: './the-button.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './the-button.component.css',
        './shakeCrazy.css',
        './shakeHard.css',
        './shakeLittle.css'
    ]
    // ,
    // animations: [
    //     trigger('spin', [
    //         state('original', style({
    //             transform: 'rotate(0deg)'
    //         })),
    //         state('oneEighty', style({
    //             transform: 'rotate(-180deg)'
    //         })),
    //         state('threeSixty', style({
    //             transform: 'rotate(-360deg)'
    //         })),
    //         transition('* <=> original', animate('1500ms ease-out'))
    //     ]),
    //     trigger('spinMoveFade', [
    //         state('original', style({
    //             transform: 'rotate(0deg)',
    //             opacity: 0
    //         })),
    //         state('spinMoveFade', style({
    //             transform: 'rotate(-360deg)',
    //             opacity: 1
    //         })),
    //         transition('* => spinMoveFade', [
    //             animate(1000, keyframes([
    //                 style({
    //                     opacity: 0,
    //                     transform: 'translateY(-50px)',
    //                     offset: 0
    //                 }),
    //                 style({
    //                     opacity: .8,
    //                     transform: 'translateY(-100px)',
    //                     offset: 0.5
    //                 }),
    //                 style({
    //                     opacity: 1,
    //                     transform: 'translateY(-150px)',
    //                     offset: 0.8
    //                 }),
    //                 style({
    //                     opacity: 1,
    //                     offset: 1
    //                 })
    //             ]))
    //         ])
    //     ]),
    //     trigger('bigToSmall', [
    //         state('big', style({
    //             transform: 'scale(1)',
    //             opacity: 0
    //         })),
    //         state('small', style({
    //             transform: 'scale(1)',
    //             opacity: 1
    //         })),
    //         transition('* => small', [
    //             animate(1500, keyframes([
    //                 style({
    //                     opacity: 0,
    //                     transform: 'scale(0)',
    //                     offset: 0
    //                 }),
    //                 style({
    //                     opacity: 1,
    //                     transform: 'scale(10)',
    //                     offset: 0.2
    //                 }),
    //                 style({
    //                     opacity: .1,
    //                     transform: 'scale(3)',
    //                     offset: 0.9
    //                 }),
    //                 style({
    //                     opacity: 1,
    //                     transform: 'scale(1)',
    //                     offset: 1
    //                 })
    //             ]))
    //         ])
    //     ])
    // ]
})

export class TheButtonComponent implements OnInit, OnDestroy {
    @ViewChild(DiceComponent) dice;
    @ViewChild(UsersComponent) users;
    public showDevValues = false;
    public click = 1;
    public gambler = false;
    public maestro = false;
    public grinder = false;
    public mcFly = false;

    public comboType: any;
    private lastComboType: any;
    private user: User;
    private tick: number;
    public timeLimit: number;
    public countDown: number;
    public getReady = false;
    public gameOn = false;
    public noStart = false;
    public newRecord = false;
    public foreverAlone = false;
    private subscription: Subscription;

    private countdownValue = 15;
    private countupValue = 5;
    private noStartValue = -5;
    private readyIn = 0;

    private counter = 5000;
    public userScore = 0;
    private userLevel = '';
    public bonus = 1;
    private bonusTimePerClick = 10;
    public bonusTime = 0;
    public rage = 12;

    public showCheats = false;
    private cheatX2 = false;
    private cheatX3 = false;
    private cheatX4 = false;
    private cheatX5 = false;
    private cheatX9 = false;
    private cheatX20 = false;
    private leetX2 = false;
    private reached1337 = false;
    private reached9999 = false;
    private newUserScoreGiven = false;

    public totalBonusTime = 0;
    private randomNumber = 0;
    private baseRandomNumberSpread = 0; // 50 is default
    private randomNumberSpread = 24;
    public showExtraTime = true;
    public perseverance = 'L053R';
    public level = 'N00B';
    private timeBlocks = [
        { id: 1, selected: false },
        { id: 2, selected: false },
        { id: 3, selected: false },
        { id: 4, selected: false },
        { id: 5, selected: false },
        { id: 6, selected: false },
        { id: 7, selected: false },
        { id: 8, selected: false },
        { id: 9, selected: false },
        { id: 10, selected: false },
        { id: 11, selected: false },
        { id: 12, selected: false },
        { id: 13, selected: false },
        { id: 14, selected: false },
        { id: 15, selected: false },
        { id: 16, selected: false },
        { id: 17, selected: false },
        { id: 18, selected: false },
        { id: 19, selected: false },
        { id: 20, selected: false },
        { id: 21, selected: false },
        { id: 22, selected: false },
        { id: 23, selected: false },
        { id: 24, selected: false },
    ];

    // Adjectives
    timeLevel = [
        'L053R',          // 1
        'Casual',         // 2
        'Ambitious',      // 3
        'Hardy',          // 4
        'Maniac',         // 5
        'Long-lived',     // 6
        'Hard-boiled',    // 7
        'EPIC',           // 8
        'GODLIKE',        // 9
        'NO LIFE',        // 10
        'CHEATING',       // 11
        'Oh, fuck off...', // 12
        'BAWS' // 13
    ];

    // Substantives
    scoreLevel = [
        'N00B',
        'Grunt',
        'Corporal',
        'Special Ops',
        'BEAST',
        'PUNISHER',
        'JUGGERNAUGHT',
        '1337',
        'SUPERMAN',
        'BOSS'
    ];

    // Light-switch Colors
    lightSwitches = [
        { color: 'dark-red', status: false },
        { color: 'red', status: false },
        { color: 'red-orange', status: false },
        { color: 'orange-yellow', status: false },
        { color: 'yellow', status: false },
        { color: 'green', status: false },
        { color: 'cyan-green', status: false },
        { color: 'cyan', status: false },
        { color: 'light-blue', status: false },
        { color: 'blue', status: false },
        { color: 'purple', status: false },
        { color: 'pink', status: false },
    ];

    private state = 'small';
    spinMoveFade() {
        this.state = 'spinMoveFade';
    }
    bigToSmall() {
        this.state = 'small';
    }
    defaultState() {
        this.state = 'defaultState';
    }
    toggleState() {
        this.state = (this.state === 'small' ? 'original' : 'small');
        alert(this.state);
    }

    LightSwitchToggle($event) {
        this.lightSwitches.forEach(lightSwitch => {
            if ($event.color === lightSwitch.color) {
                lightSwitch.status = $event.status;
            }
        });
    }

    getPerseverance($event) {
      this.perseverance = $event;
    }
    getRandomNumberSpread($event) {
      this.randomNumberSpread = $event;
    }
    getTimeLimit($event) {
      this.timeLimit = $event;
    }
    getTotalBonusTime($event) {
      this.totalBonusTime = $event;
    }

    getGambler($event) {
      this.gambler = $event;
    }
    getMaestro($event) {
      this.maestro = $event;
    }
    getGrinder($event) {
      this.grinder = $event;
    }
    getMcFly($event) {
      this.mcFly = $event;
    }

    NoExtraTimeBlock() {
        this.timeBlocks.forEach(timeBlock => {
            timeBlock.selected = false;
        });
    }
    SetExtraTimeBlock(number) {
        this.timeBlocks.forEach(timeBlock => {
            if (timeBlock.id === number) {
                timeBlock.selected = true;
            } else {
                timeBlock.selected = false;
            }
        });
    }
    RandomExtraTimeBlock() {
        this.randomNumber = Math.floor((Math.random() * this.randomNumberSpread) + 1);
        this.SetExtraTimeBlock(this.randomNumber);
    }

    CheckStatusArrayMatch(array) {
        let countMatches = 0;
        for (let i = 0; i < this.lightSwitches.length; i++) {
            if (this.lightSwitches[i].status === array[i]) {
                countMatches++;
            }
        }
        return countMatches === 12;
    }

    CheckForCheats() {
        let rainbow = false;
        let rgb = false;
        let roCgCLb = false;
        let sunset = false;

        const rainbowArray = [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ];
        const rgbArray = [
            false,
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            true,
            false,
            false
        ];
        const roCgCLbArray = [
            false,
            false,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false
        ];
        const sunsetArray = [
            true,
            true,
            true,
            true,
            true,
            false,
            false,
            false,
            false,
            false,
            true,
            true
        ];

        rainbow = this.CheckStatusArrayMatch(rainbowArray);
        rgb = this.CheckStatusArrayMatch(rgbArray);
        roCgCLb = this.CheckStatusArrayMatch(roCgCLbArray);
        sunset = this.CheckStatusArrayMatch(sunsetArray);

        if (rainbow || rgb || roCgCLb || sunset) {
            if (rainbow) {
                this.CheatToggle(2);
            }
            if (rgb) {
                this.CheatToggle(3);
            }
            if (roCgCLb) {
                this.CheatToggle(4);
            }
            if (sunset) {
                this.CheatToggle(5);
            }
        } else {
            this.TurnCheatsOff();
        }
        this.lightSwitches.forEach(lightSwitch => {
            lightSwitch.status = false;
        });
    }

    CheatToggle(number) {
        if (number === 2) {
            this.cheatX2 = !this.cheatX2;
            this.SetCheat(this.cheatX2, number);
        } else if (number === 3) {
            this.cheatX3 = !this.cheatX3;
            this.SetCheat(this.cheatX3, number);
        } else if (number === 4) {
            this.cheatX4 = !this.cheatX4;
            this.SetCheat(this.cheatX4, number);
        } else if (number === 5) {
            this.cheatX5 = !this.cheatX5;
            this.SetCheat(this.cheatX5, number);
        } else if (number === 9) {
            this.cheatX9 = !this.cheatX9;
            this.SetCheat(this.cheatX9, number);
        } else if (number === 20) {
            this.cheatX20 = !this.cheatX20;
            this.SetCheat(this.cheatX20, number);
        }
    }

    TurnCheatsOff() {
        this.cheatX2 = false;
        this.cheatX3 = false;
        this.cheatX4 = false;
        this.cheatX5 = false;
        this.cheatX9 = false;
        this.cheatX20 = false;
        this.bonus = 1;
    }

    SetCheat(bool, number) {
        if (bool) {
          this.bonus *= number;
        } else { this.bonus /= number; }
        this.bonus = Math.round(this.bonus);
        if (this.bonus < 1) {
          this.bonus = 1;
        }
    }

    CheckLevel(userScore) {
        if (userScore > 0 && userScore < 100) {
            this.level = this.scoreLevel[0];
        }
        if (userScore >= 100 && userScore < 1000) {
            this.level = this.scoreLevel[1];
        }
        if (userScore >= 1000 && userScore < 10000) {
            this.level = this.scoreLevel[2];
        }
        if (userScore >= 10000 && userScore < 100000) {
            this.level = this.scoreLevel[3];
        }
        if (userScore >= 100000 && userScore < 1000000) {
            this.level = this.scoreLevel[4];
        }
        if (userScore >= 1000000 && userScore < 10000000) {
            this.level = this.scoreLevel[5];
        }
        if (userScore >= 10000000 && userScore < 100000000) {
            this.level = this.scoreLevel[6];
        }
        if (userScore >= 100000000 && userScore < 1000000000) {
            this.level = this.scoreLevel[7];
        }
        if (userScore >= 1000000000 && userScore < 10000000000) {
            this.level = this.scoreLevel[8];
        }
        if (userScore >= 10000000000 && userScore < 100000000000) {
          this.level = this.scoreLevel[8];
      }
    }

    Count() {
      if (this.userScore > 49 && this.userScore < 70
          || this.userScore > 99 && this.userScore < 120
          || this.userScore > 149 && this.userScore < 170
          || this.userScore > 199 && this.userScore < 220) {
          this.spinMoveFade();
      }
      if (this.userScore >= 70 && this.userScore <= 98
          || this.userScore >= 120 && this.userScore <= 148
          || this.userScore >= 170 && this.userScore <= 198
          || this.userScore >= 220 && this.userScore <= 298
          || this.userScore >= 310 && this.userScore <= 348
          || this.userScore >= 360 && this.userScore <= 1336
          || this.userScore >= 1347 && this.userScore <= 4999
          || this.userScore >= 5020 && this.userScore <= 9998) {
          this.defaultState();
      }
      if (this.userScore > 299 && this.userScore < 310
          || this.userScore > 349 && this.userScore < 360
          || this.userScore > 1336 && this.userScore < 1347
          || this.userScore > 4999 && this.userScore < 5020
          || this.userScore > 9999 ) {
          this.bigToSmall();
      }
      if (this.userScore > 1337 && !this.reached1337) {
          this.bonus *= 2;
          this.reached1337 = true;
      }
      if (this.userScore > 9999 && !this.reached9999) {
          // this.TurnCheatsOff();
          this.CheatToggle(20);
          this.reached9999 = true;
      }
      this.CheckLevel(this.userScore);
      this.userScore += this.bonus;
    }

    CalculateTimer(t) {
      if (this.rage < 11) {
        this.rage++;
      }
      if (this.click > 0) {
        this.getReady = false;
      }
      this.click = 1;
      this.tick = t;
      this.bonusTime = 0;
      if (this.gameOn) {
          this.RandomExtraTimeBlock();
          this.countDown = this.timeLimit - this.tick;
      }
      if (this.countDown <= 0 && !this.newUserScoreGiven) {
          this.newUserScore();
          this.NoExtraTimeBlock();
          this.perseverance = 'N00B';
          this.level = '';
          this.gameOn = false;
          this.noStart = true;
      }
      if (this.countDown <= 0 && this.newUserScoreGiven) {
          this.countDown = this.timeLimit - this.tick;
          this.readyIn = this.countupValue + this.timeLimit - t;
      }
      if (this.countDown === this.noStartValue) {
          this.noStart = false;
          this.newUserScoreGiven = false;
          this.subscription.unsubscribe();
      }
    }

    StartOver() {
      this.getReady = true;
      const timer = TimerObservable.create(2000, 1000);
      this.subscription = timer.subscribe(t => {
        this.CalculateTimer(t);
      });
      this.TurnCheatsOff();
      this.gameOn = true;
      this.userScore = 0;
      this.perseverance = 'L053R';
      this.level = 'N00B';
      this.countDown = this.countdownValue;
      this.timeLimit = this.countdownValue;
      this.totalBonusTime = 0;
      this.comboType = '';
      this.user.playthroughs++;
      this.users.getUsers();
      this.newRecord = false;
    }

    constructor(
      private data: UpdateService,
      private userService: UserService,
      private authenticationService: AuthenticationService) {
        this.comboType = '';
    }
    ngOnInit() {
      // document.getElementById('countButton').addEventListener('touchstart', this.preventZoom);
      this.authenticationService.currentUser.subscribe(user => this.user = user);
      this.countDown = this.countdownValue;
      this.timeLimit = this.countdownValue;
      // const timer = TimerObservable.create(2000, 1000);
      // this.subscription = timer.subscribe(t => {
      //   this.CalculateTimer(t);
      // });
    }

    newUserScore() {
        this.newUserScoreGiven = true;
        if (this.perseverance === this.timeLevel[0]) {
            this.userScore += 0;
        } else if (this.perseverance === this.timeLevel[1]) {
            this.userScore *= 1.2;
        } else if (this.perseverance === this.timeLevel[2]) {
            this.userScore *= 1.4;
        } else if (this.perseverance === this.timeLevel[3]) {
            this.userScore *= 1.6;
        } else if (this.perseverance === this.timeLevel[4]) {
            this.userScore *= 2;
        } else if (this.perseverance === this.timeLevel[5]) {
            this.userScore *= 4;
        } else if (this.perseverance === this.timeLevel[6]) {
            this.userScore *= 7;
        } else if (this.perseverance === this.timeLevel[7]) {
            this.userScore *= 10;
        } else if (this.perseverance === this.timeLevel[8]) {
            this.userScore *= 20;
        } else if (this.perseverance === this.timeLevel[9]) {
            this.userScore *= 99;
        }
        const lvl = this.perseverance + ' ' + this.level;
        if (this.user.score < this.userScore) {
          this.user.score = this.userScore;
          this.newRecord = true;
        } else {
          this.newRecord = false;
        }
        this.userService.updateUser(this.user);
        this.authenticationService.changeUser(this.user);
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    receiveCombo($event) {
      this.comboType = $event;
      this.setComboBonus(this.comboType, true);
    }

    setComboBonus(comboType, gamblerSuccess) {
      switch (this.comboType) {
        case 'Yatzy mothafocka!':
          this.SetCheat(gamblerSuccess, 45);
          break;
        case 'Four of a kind':
          this.SetCheat(gamblerSuccess, 22);
          break;
        case 'Full house':
          this.SetCheat(gamblerSuccess, 13);
          break;
        case 'Straight':
          this.SetCheat(gamblerSuccess, 8);
          break;
        case 'Three of a kind':
          this.SetCheat(gamblerSuccess, 5);
          break;
        case 'Two pairs':
          this.SetCheat(gamblerSuccess, 2);
          break;
        case 'Pair':
          this.SetCheat(gamblerSuccess, 0.5);
          break;
        default:
          this.SetCheat(gamblerSuccess, 0);
          this.rage = 0;
          break;
      }
    }

    setClick(click) {
      this.click = click;
    }

    preventZoom(e) {
      const t2 = e.timeStamp;
      const t1 = e.currentTarget.dataset.lastTouch || t2;
      const dt = t2 - t1;
      const fingers = e.touches.length;
      e.currentTarget.dataset.lastTouch = t2;
      if (!dt || dt > 500 || fingers > 1) { return this; } // not double-tap

      e.preventDefault();
      e.target.click();
    }
}

