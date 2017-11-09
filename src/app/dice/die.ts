export class Die {
  public roll: number;
  public lastRoll: {
    number: number;
    face: string;
  };
  public rollCount: number;
  public rollFinished: boolean;
  public rollHistory: object[];
  public dieFace: string;

  constructor() {
    this.rollCount = 0;
    this.rollFinished = true;
    this.rollHistory = [];
    this.lastRoll = {
      number: 1,
      face: '   \n  o  \n    '
    };
  }

  async dieRoll() {
    this.rollFinished = false;
    const speed = Math.ceil(Math.random() * 10);
    let decceleration = 0;
    for (let i = 0; i < 100; i++) {
      if (i > 90) {
        decceleration = 10;
      } else if (i > 70) {
        decceleration = 7;
      } else if (i > 50) {
        decceleration = 5;
      } else if (i > 30) {
        decceleration = 3;
      }
      this.roll = Math.ceil(Math.random() * 6);
      this.numberToFace(this.roll);
      await this.sleep(speed * decceleration);
    }
    this.rollCount++;
    this.lastRoll.number = Math.ceil(Math.random() * 6);
    this.numberToFace(this.lastRoll.number);
    this.rollHistory.push(this.lastRoll);
    this.rollFinished = true;
  }

  numberToFace(number) {
    switch (number) {
      case 1:
        this.lastRoll.face = '   \n  o  \n    ';
        break;
      case 2:
        this.lastRoll.face = 'o   \n    \n    o';
        break;
      case 3:
        this.lastRoll.face = 'o   \n  o \n    o';
        break;
      case 4:
        this.lastRoll.face = 'o   o\n    \no   o';
        break;
      case 5:
        this.lastRoll.face = 'o   o\n  o \no   o';
        break;
      case 6:
        this.lastRoll.face = 'o   o\no   o\no   o';
        break;
      default:
        break;
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
