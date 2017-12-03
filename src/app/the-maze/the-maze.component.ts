import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-the-maze',
  templateUrl: './the-maze.component.html',
  styleUrls: ['./the-maze.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheMazeComponent implements OnInit, AfterViewInit {

  @ViewChild('maze') mazeCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public user: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
    }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    // const ctx: CanvasRenderingContext2D =
    // this.canvasRef.nativeElement.getContext('2d');

    // // Draw the clip path that will mask everything else
    // // that we'll draw later.
    // ctx.beginPath();
    // ctx.moveTo(250, 60);
    // ctx.lineTo(63.8, 126.4);
    // ctx.lineTo(92.2, 372.6);
    // ctx.lineTo(250, 460);
    // ctx.lineTo(407.8, 372.6);
    // ctx.lineTo(436.2, 126.4);
    // ctx.moveTo(250, 104.2);
    // ctx.lineTo(133.6, 365.2);
    // ctx.lineTo(177, 365.2);
    // ctx.lineTo(200.4, 306.8);
    // ctx.lineTo(299.2, 306.8);
    // ctx.lineTo(325.2, 365.2);
    // ctx.lineTo(362.6, 365.2);
    // ctx.lineTo(250, 104.2);
    // ctx.moveTo(304, 270.8);
    // ctx.lineTo(216, 270.8);
    // ctx.lineTo(250, 189);
    // ctx.lineTo(284, 270.8);
    // ctx.clip('evenodd');

    // // Draw 50,000 circles at random points
    // ctx.beginPath();
    // ctx.fillStyle = '#DD0031';
    // for (let i = 0 ; i < 50000 ; i++) {
    //   const x = Math.random() * 500;
    //   const y = Math.random() * 500;
    //   ctx.moveTo(x, y);
    //   ctx.arc(x, y, 1, 0, Math.PI * 2);
    // }
    // ctx.fill();
  }

  ngAfterViewInit(): void {
    window.onload = () => {
      const c = document.getElementById('maze');
      const ctx = (<HTMLCanvasElement>c).getContext('2d');
      ctx.moveTo(0, 0);
      ctx.lineTo(200, 100);
      ctx.stroke();
      // this.context = (<HTMLCanvasElement>this.mazeCanvas.nativeElement).getContext('2d');
    };
  }
  update() {
    this.userService.updateUser(this.user);
  }

}
