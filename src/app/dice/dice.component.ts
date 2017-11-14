import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Die } from './die';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiceComponent implements OnInit {
  @Output() comboEvent = new EventEmitter<string>();
  private rollCount: number;
  public diceRolling = false;
  public diceSorting = false;
  public dice = [
    new Die(),
    new Die(),
    new Die(),
    new Die(),
    new Die()
  ];

  public comboType = '';
  private diceRollResult = [
    'Pair',
    'Two pairs',
    'Three of a kind',
    'Straight',
    'Full house',
    'Four of a kind',
    'Yatzy mothafocka!',
    'Only singles...'
  ];

  private counts = [
      0,
      0,
      0,
      0,
      0,
      0
  ];

  constructor() {
    this.rollCount = 0;
  }

  ngOnInit() {
  }

  async rollDice() {
    this.comboType = '';
    this.diceRolling = true;
    let countFinished = 0;
    this.dice.forEach(die => {
      if (die.rollFinished) {
        countFinished++;
      }
    });
    if (countFinished === 5) {
      this.dice.forEach(die => {
        die.dieRoll();
      });
    }
    await this.sleep(5000);
    this.diceSorting = true;
    this.dice.sort(function (a, b) {
      return a.lastRoll.number - b.lastRoll.number;
    });
    await this.sleep(1000);
    this.setCombos(this.dice);
    this.analyzeCombos();
    this.cleanCombos();
    this.diceSorting = false;
    this.diceRolling = false;
    this.rollCount++;
    this.comboEvent.emit(this.comboType);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setCombos(dice) {
    for (let i = 0; i < dice.length; i++) {
      switch (dice[i].lastRoll.number) {
        case 1:
          console.log('Adding to ones');
          this.counts[0]++;
          break;
        case 2:
          console.log('Adding to twos');
          this.counts[1]++;
          break;
        case 3:
          console.log('Adding to threes');
          this.counts[2]++;
          break;
        case 4:
          console.log('Adding to fours');
          this.counts[3]++;
          break;
        case 5:
          console.log('Adding to fives');
          this.counts[4]++;
          break;
        case 6:
          console.log('Adding to sixes');
          this.counts[5]++;
          break;
        default:
          break;
      }
    }
    console.log('========================================');
  }

  analyzeCombos() {
    this.comboType = undefined;
    for (let i = 0; i < this.counts.length; i++) {
      if (this.counts[i] === 5) {
        this.comboType = this.diceRollResult[6];
        this.counts[i] = 0;
        break;
      } else if (this.counts[i] === 4) {
        this.comboType = this.diceRollResult[5];
        this.counts[i] = 0;
        break;
      } else if (this.counts[i] === 3) {
        this.comboType = this.diceRollResult[2];
        this.counts[i] = 0;
        for (let x = 0; x < this.counts.length; x++) {
          if (this.counts[x] === 2) {
            this.comboType = this.diceRollResult[4];
            this.counts[x] = 0;
            break;
          }
        }
        this.counts[i] = 0;
        break;
      } else if (this.counts[i] === 2) {
        this.comboType = this.diceRollResult[0];
        this.counts[i] = 0;
        for (let x = 0; x < this.counts.length; x++) {
          if (this.counts[x] === 2) {
            this.comboType = this.diceRollResult[1];
            this.counts[x] = 0;
            break;
          }
        }
        this.counts[i] = 0;
        break;
      } else if (
        this.counts[i] === 1 &&
        this.counts[i + 1] === 1 &&
        this.counts[i + 2] === 1 &&
        this.counts[i + 3] === 1 &&
        this.counts[i + 4] === 1
        ) {
          this.comboType = this.diceRollResult[3];
          this.counts[i] = 0;
          break;
      } else {
        this.comboType = this.diceRollResult[7];
      }
      this.counts[i] = 0;
    }
  }

  cleanCombos() {
    for (let i = 0; i < this.counts.length; i++) {
      this.counts[i] = 0;
    }
  }
}
