import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
export class CanvasTutorial implements AfterViewInit {
  ngAfterViewInit(): void {
    window.onload = () => {
      // Clock setup
      const clockCanvas = (<HTMLCanvasElement>document.getElementById('clock'));
      const clockCtx = clockCanvas.getContext('2d');
      let clockRadius = clockCanvas.height / 2;
      clockCtx.translate(clockRadius, clockRadius);
      clockRadius = clockRadius * 0.90;
      setInterval(() => {
        this.drawClock(clockCtx, 'Red', clockRadius);
      }, 1000);
    };
  }
  // -------------- Tutorial Functions -------------- //
  // this.fillCanvas(ctx, fillColor);
  // this.drawLine(ctx, drawColor1);
  // this.drawCircle(ctx, drawColor1);
  // this.drawText(ctx, drawColor1, font);
  // this.drawStrokeText(ctx, drawColor1, font);
  // this.drawCenteredText(ctx, drawColor1, font, canvas);
  // this.drawLinearGradient(ctx, drawColor1,);
  // this.drawCircularGradient(ctx, drawColor1);
  // this.drawImage(ctx, 'profileImage', drawColor1);

  /////////////////////////////
  // Clock canvas functions
  ////////////////////////////////////////////////////////////////////////////////
  drawClock(ctx, color, radius) {
    this.drawFace(ctx, color, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx, color, radius) {
    let grad;

    this.drawCircle(ctx, color, radius);
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, color);
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for ( num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
  //////////////////////////////
  // Canvas tutorial functions
  ////////////////////////////////////////////////////////////////////////////////
  fillCanvas(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 500, 500);
  }
  drawLine(ctx, color) {
    ctx.fillStyle = color;
    ctx.moveTo(0, 0);
    ctx.lineTo(500, 500);
    ctx.stroke();
  }

  drawCircle(ctx, color, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
  // drawCircle(ctx, color) {
  //   ctx.fillStyle = color;
  //   ctx.beginPath();
  //   ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //   ctx.stroke();
  // }

  drawText(ctx, color, font) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText('Hello World', 10, 50);
  }

  drawStrokeText(ctx, color, font) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.strokeText('Hello World', 10, 50);
  }

  drawCenteredText(ctx, color, font, canvas) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
  }

  drawLinearGradient(ctx, color1, color2) {
    const grd = ctx.createLinearGradient(0 , 0, 200, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(10, 10, 150, 80);
  }

  drawCircularGradient(ctx, color1, color2) {
    const grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(10, 10, 150, 80);
  }

  drawImage(ctx, imagePath) {
    const img = document.getElementById(imagePath);
    ctx.drawImage(img, -7, 0);
  }


  ////////////////////
  // Canvas examples
  ////////////////////////////////////////////////////////////////////////////////
  displayCtxTest(ctx) {
    // Draw the clip path that will mask everything else
    // that we'll draw later.
    ctx.beginPath();
    ctx.moveTo(250, 60);
    ctx.lineTo(63.8, 126.4);
    ctx.lineTo(92.2, 372.6);
    ctx.lineTo(250, 460);
    ctx.lineTo(407.8, 372.6);
    ctx.lineTo(436.2, 126.4);
    ctx.moveTo(250, 104.2);
    ctx.lineTo(133.6, 365.2);
    ctx.lineTo(177, 365.2);
    ctx.lineTo(200.4, 306.8);
    ctx.lineTo(299.2, 306.8);
    ctx.lineTo(325.2, 365.2);
    ctx.lineTo(362.6, 365.2);
    ctx.lineTo(250, 104.2);
    ctx.moveTo(304, 270.8);
    ctx.lineTo(216, 270.8);
    ctx.lineTo(250, 189);
    ctx.lineTo(284, 270.8);
    ctx.clip('evenodd');

    // Draw 50,000 circles at random points
    ctx.beginPath();
    ctx.fillStyle = '#DD0031';
    for (let i = 0 ; i < 50000 ; i++) {
      const x = Math.random() * 500;
      const y = Math.random() * 500;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 1, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  // drawStars() {
  //   for (let i = 0; i < 1500; i++) {
  //     // Generate random parameters for the star
  //     let x = Math.round(Math.random() * this._width);
  //     let y = Math.round(Math.random() * this._height);
  //     let rad = Math.ceil(Math.random() * 2);
  //     let alpha = Math.min(Math.random() * 0.25, 1);

  //     // Draw the star
  //     let star = new PIXI
  //   }
  // }

  // const gamePiece = {
  //   width: 50,
  //   height: 50,
  //   x: 150,
  //   y: 150,
  //   update: function(){
  //     // ctx = gameArea.context;
  //     gameCtx.fillStyle = drawColor2;
  //     gameCtx.fillRect(this.x, this.y, this.width, this.height);
  //   }
  // };
  // this.myGamePiece = gamePiece;
}
 // render() {
  //   this.myGameArea.context.clearRect(0, 0, this.myGameArea.canvas.width, this.myGameArea.canvas.height);
  //   this.myGameArea.context.beginPath();
  //   this.myGameArea.context.rect(50, 50, 100, 100);
  //   this.myGameArea.context.fillStyle = 'Red';
  //   this.myGameArea.context.fill();
  // }
