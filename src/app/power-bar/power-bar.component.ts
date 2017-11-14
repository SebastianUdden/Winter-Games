import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-power-bar',
  templateUrl: './power-bar.component.html',
  styleUrls: ['./power-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PowerBarComponent implements OnInit {
  @Input() pbScore: number;
  @Input() pbTimeLimit: number;
  @Input() pbTotalBonusTime: number;
  @Output() perseveranceEvent = new EventEmitter<string>();
  @Output() randomNumberSpreadEvent = new EventEmitter<number>();
  @Output() timeLimitEvent = new EventEmitter<number>();
  @Output() totalBonusTimeEvent = new EventEmitter<number>();


  // Temps
  private timeLimit: number;
  private randomNumber = 0;
  private baseRandomNumberSpread = 0; // 50 is default
  private randomNumberSpread = 24;
  private showExtraTime = true;
  private perseverance = 'L053R';
  private userLevel = '';
  public level = 1;
  private levelHeight = 0;
  private bonus = 1;
  private bonusTimePerClick = 10;
  private bonusTime = 0;
  public totalBonusTime = 0;
  timeLevel = [
      'L053R',           // 1
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
  constructor() {
  }

  extraTime(bonus) {
      this.timeLimit = this.pbTimeLimit;
      this.totalBonusTime = this.pbTotalBonusTime;
      this.bonusTimePerClick = bonus;
      this.randomNumberSpread = this.baseRandomNumberSpread + 24;
      if (this.totalBonusTime < 20) {
          this.level = 1;
          this.perseverance = this.timeLevel[0];
          this.bonusTimePerClick = 6;
          this.levelHeight = this.totalBonusTime + 7;
          this.randomNumberSpread = this.baseRandomNumberSpread + 33;
      }
      if (this.totalBonusTime >= 20 && this.totalBonusTime < 40) {
          this.level = 2;
          this.perseverance = this.timeLevel[1];
          this.bonusTimePerClick = 5;
          this.levelHeight = this.totalBonusTime - 19;
          this.randomNumberSpread = this.baseRandomNumberSpread + 44;
      }
      if (this.totalBonusTime >= 40 && this.totalBonusTime < 60) {
          this.level = 3;
          this.perseverance = this.timeLevel[2];
          this.bonusTimePerClick = 4;
          this.levelHeight = this.totalBonusTime - 39;
          this.randomNumberSpread = this.baseRandomNumberSpread + 55;
      }
      if (this.totalBonusTime >= 60 && this.totalBonusTime < 80) {
          this.level = 4;
          this.perseverance = this.timeLevel[3];
          this.bonusTimePerClick = 3;
          this.levelHeight = this.totalBonusTime - 59;
          this.randomNumberSpread = this.baseRandomNumberSpread + 66;
      }
      if (this.totalBonusTime >= 80 && this.totalBonusTime < 100) {
          this.level = 5;
          this.perseverance = this.timeLevel[4];
          this.bonusTimePerClick = 2;
          this.levelHeight = this.totalBonusTime - 79;
          this.randomNumberSpread = this.baseRandomNumberSpread + 77;
      }
      if (this.totalBonusTime >= 100 && this.totalBonusTime < 120) {
          this.level = 6;
          this.perseverance = this.timeLevel[5];
          this.bonusTimePerClick = 1;
          this.levelHeight = this.totalBonusTime - 99;
          this.randomNumberSpread = this.baseRandomNumberSpread + 88;
      }
      if (this.totalBonusTime >= 120 && this.totalBonusTime < 140) {
          this.level = 7;
          this.perseverance = this.timeLevel[6];
          this.bonusTimePerClick = 2;
          this.levelHeight = this.totalBonusTime - 119;
          this.randomNumberSpread = this.baseRandomNumberSpread + 99;
      }
      if (this.totalBonusTime >= 140 && this.totalBonusTime < 160) {
          this.level = 8;
          this.perseverance = this.timeLevel[7];
          this.bonusTimePerClick = 3;
          this.levelHeight = this.totalBonusTime - 139;
          this.randomNumberSpread = this.baseRandomNumberSpread + 111;
      }
      if (this.totalBonusTime >= 160 && this.totalBonusTime < 180) {
          this.level = 9;
          this.perseverance = this.timeLevel[8];
          this.bonusTimePerClick = 4;
          this.levelHeight = this.totalBonusTime - 159;
          this.randomNumberSpread = this.baseRandomNumberSpread + 122;
      }
      if (this.totalBonusTime >= 180 && this.totalBonusTime < 200) {
          this.level = 10;
          this.perseverance = this.timeLevel[9];
          this.bonusTimePerClick = 5;
          this.levelHeight = this.totalBonusTime - 179;
          this.randomNumberSpread = this.baseRandomNumberSpread + 133;
      }
      if (this.totalBonusTime >= 200 && this.totalBonusTime < 220) {
          this.level = 11;
          this.perseverance = this.timeLevel[10];
          this.bonusTimePerClick = 6;
          this.levelHeight = this.totalBonusTime - 199;
          this.randomNumberSpread = this.baseRandomNumberSpread + 144;
      }
      if (this.totalBonusTime >= 220 && this.totalBonusTime < 240) {
          this.level = 12;
          this.perseverance = this.timeLevel[11];
          this.bonusTimePerClick = 7;
          this.levelHeight = this.totalBonusTime - 219;
          this.randomNumberSpread = this.baseRandomNumberSpread + 155;
      }
      if (this.totalBonusTime >= 240) {
          this.level = 13;
          this.perseverance = this.timeLevel[12];
          this.bonusTimePerClick = 8;
          this.levelHeight = this.totalBonusTime - 239;
          this.randomNumberSpread = this.baseRandomNumberSpread + 166;
      }
      this.timeLimit += this.bonusTimePerClick;
      this.bonusTime += this.bonusTimePerClick;
      this.totalBonusTime += this.bonusTimePerClick;
      this.perseveranceEvent.emit(this.perseverance);
      this.randomNumberSpreadEvent.emit(this.randomNumberSpread);
      this.timeLimitEvent.emit(this.timeLimit);
      this.totalBonusTimeEvent.emit(this.totalBonusTime);
  }

  ngOnInit() {
  }
}
