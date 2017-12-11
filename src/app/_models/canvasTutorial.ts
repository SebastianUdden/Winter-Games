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
}
