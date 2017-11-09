import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Die } from './die';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiceComponent implements OnInit {
  private rollCount: number;
  private diceRolling = false;
  private diceSorting = false;
  private dice = [
    new Die(),
    new Die(),
    new Die(),
    new Die(),
    new Die()
  ];

  private diceRoll = [
    'Pair',
    'Two pairs',
    'Three of a kind',
    'Straight',
    'Full House',
    'Four of a kind',
    'Five of a kind'
  ];

  constructor() {
    this.rollCount = 0;
  }

  ngOnInit() {
  }

  async rollDice() {
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
    this.diceSorting = false;
    this.diceRolling = false;
    this.rollCount++;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
