export class Player {
  constructor(
    public number = 0,
    public ctx = '',
    public color = 'teal',
    public width = 50,
    public height = 50,
    public speedX = 0,
    public speedY = 0,
    public x = 50,
    public y = 50,
    public mouth = 6,
    public direction = 'Up',
    public eat = false,
    public dead = false,
    public newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    },
    public crashWith = function(otherobj) {
      const myleft = this.x;
      const myright = this.x + (this.width);
      const mytop = this.y;
      const mybottom = this.y + (this.height);
      const otherleft = otherobj.x;
      const otherleftedge = otherobj.x + (otherobj.width * 0.1);
      const otherright = otherobj.x + (otherobj.width);
      const otherrightedge = otherobj.x + (otherobj.width * 0.9);
      const othertop = otherobj.y;
      const otherbottom = otherobj.y + (otherobj.height);
      const otherbottomedge = otherobj.y + (otherobj.height * 0.9);
      const othertopedge = otherobj.y + (otherobj.height * 0.1);
      let crash = false;
      const alignedHorizontally = (mybottom < othertop && mytop > otherbottom) || (mybottom > othertop && mytop < otherbottom);
      const alignedVertically = (myright < otherleft && myleft > otherright) || (myright > otherleft && myleft < otherright);

      const lowerThanTop = mybottom > othertop;
      const lowerThanTopEdge = mybottom > othertopedge;
      const higherThanBottomEdge = mytop < otherbottomedge;
      const higherThanBottom = mytop < otherbottom;

      const lowerThanLeft = myright > otherleft;
      const lowerThanLeftEdge = myright > otherleftedge;
      const higherThanRightEdge = myleft < otherrightedge;
      const higherThanRight = myleft < otherright;

      if (alignedVertically && (higherThanBottom && !higherThanBottomEdge) && this.direction === 'Up') {
        crash = true;
        if (otherobj.direction !== 'Down') { this.eat = true; } else {
          this.y += 10;
        }
      }
      if (alignedVertically && (lowerThanTop && !lowerThanTopEdge) && this.direction === 'Down') {
        crash = true;
        if (otherobj.direction !== 'Up') { this.eat = true; } else {
          this.y -= 10;
        }
      }
      if (alignedHorizontally && (higherThanRight && !higherThanRightEdge) && this.direction === 'Left') {
        crash = true;
        if (otherobj.direction !== 'Right') { this.eat = true; } else {
          this.x += 10;
        }
      }
      if (alignedHorizontally && (lowerThanLeft && !lowerThanLeftEdge) && this.direction === 'Right') {
        crash = true;
        if (otherobj.direction !== 'Left') { this.eat = true; } else {
          this.x -= 10;
        }
      }
      return crash;
    },
    public destroy = function(playerNumber) {
      this.dead = true;
      this.x = playerNumber - 13;
      this.y = 0;
      this.width = 0;
      this.height = 0;
    },
    public update = function() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = 'Red';
      if (this.direction === 'Up') {
        this.ctx.fillRect(this.x, this.y, this.width, this.mouth);
      }
      if (this.direction === 'Down') {
        this.ctx.fillRect(this.x, this.y + this.height, this.width, this.mouth);
      }
      if (this.direction === 'Right') {
        this.ctx.fillRect(this.x + this.width, this.y, this.mouth, this.height);
      }
      if (this.direction === 'Left') {
        this.ctx.fillRect(this.x, this.y, this.mouth, this.height);
      }
    }) {}
}
