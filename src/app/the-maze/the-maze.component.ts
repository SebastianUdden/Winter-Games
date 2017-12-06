import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

import { Player } from '../_models/player';
import { User } from '../_models/user';

@Component({
  selector: 'app-the-maze',
  templateUrl: './the-maze.component.html',
  styleUrls: ['./the-maze.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheMazeComponent implements OnInit, AfterViewInit {
  @ViewChild('maze') mazeCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public players = [
    new Player,
    new Player,
    new Player,
    new Player
  ];

  public user: User;
  public welcomeScreen = true;
  public myGameArea;
  public myGamePiece;
  public speed;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }
  update() {
    this.userService.updateUser(this.user);
  }

  startNewGame() {
    const self = this;
    self.speed = 4;
    self.welcomeScreen = true;

    // Generic variables
    const fillColor = '#702121';
    const drawColor1 = '#efefef';
    const drawColor2 = '#00efef';
    const font = '30px Arial';

    // Game setup
    this.myGameArea = {
      gameCanvas : (<HTMLCanvasElement>document.getElementById('maze')),
      start : function() {
          this.gameCanvas.width = 1080;
          this.gameCanvas.height = 720;
          this.context = this.gameCanvas.getContext('2d');
          this.interval = setInterval(() => {
            self.updateGameArea();
          }, 20);
          window.addEventListener('keydown', function (e) {
            self.welcomeScreen = false;
            self.myGameArea.keys = (self.myGameArea.keys || []);
            self.myGameArea.keys[e.keyCode] = true;
          });
          window.addEventListener('keyup', function (e) {
            self.myGameArea.keys[e.keyCode] = false;
          });
      },
      clear : function() {
          this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      },
      stop : function() {
          clearInterval(this.interval);
      }
    };

    this.startGame(drawColor2);
  }
  ngAfterViewInit(): void {
    window.onload = () => {
      const self = this;
      self.speed = 4;
      self.welcomeScreen = true;

      // Generic variables
      const fillColor = '#702121';
      const drawColor1 = '#efefef';
      const drawColor2 = '#00efef';
      const font = '30px Arial';

      // Game setup
      this.myGameArea = {
        gameCanvas : (<HTMLCanvasElement>document.getElementById('maze')),
        start : function() {
            this.gameCanvas.width = 1080;
            this.gameCanvas.height = 720;
            this.context = this.gameCanvas.getContext('2d');
            this.interval = setInterval(() => {
              self.updateGameArea();
            }, 20);
            window.addEventListener('keydown', function (e) {
              self.welcomeScreen = false;
              self.myGameArea.keys = (self.myGameArea.keys || []);
              self.myGameArea.keys[e.keyCode] = true;
            });
            window.addEventListener('keyup', function (e) {
              self.myGameArea.keys[e.keyCode] = false;
            });
        },
        clear : function() {
            this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        },
        stop : function() {
            clearInterval(this.interval);
        }
      };
      this.startGame(drawColor2);
    };
  }

  ////////////////////////////////////////////////////////////////////////////////
  // -------------------------------- CANVAS ---------------------------------- //
  ////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////
  // Interactive canvas functions
  ////////////////////////////////////////////////////////////////////////////////

  startGame(color) {
    this.myGameArea.start();
    const startCtx = this.myGameArea.context;
    this.players[0] = new Player(1, startCtx, color, 50, 50, 0, 0, 20);
    this.players[1] = new Player(2, startCtx, 'DeepSkyBlue', 50, 50, 0, 0, 80);
    this.players[2] = new Player(3, startCtx, 'Yellow', 50, 50, 0, 0, 140);
    this.players[3] = new Player(4, startCtx, 'Green', 50, 50, 0, 0, 200);
  }

  updateGameArea() {
    if (
      // Player 1
      this.players[0].crashWith(this.players[1]) ||
      this.players[0].crashWith(this.players[2]) ||
      this.players[0].crashWith(this.players[3]) ||

      // Player 2
      this.players[1].crashWith(this.players[0]) ||
      this.players[1].crashWith(this.players[2]) ||
      this.players[1].crashWith(this.players[3]) ||

      // Player 3
      this.players[2].crashWith(this.players[0]) ||
      this.players[2].crashWith(this.players[1]) ||
      this.players[2].crashWith(this.players[3]) ||

      // Player 4
      this.players[3].crashWith(this.players[0]) ||
      this.players[3].crashWith(this.players[1]) ||
      this.players[3].crashWith(this.players[2])
    ) {
      // Player 1
      if (this.players[0].crashWith(this.players[1])) {
        if (this.players[0].eat) {
          this.players[1].destroy(1);
        } else {
          this.players[0].x = 5;
          this.players[0].y = 5;
        }
      }
      if (this.players[0].crashWith(this.players[2])) {
        if (this.players[0].eat) {
          this.players[2].destroy(2);
        } else {
          this.players[0].x = 5;
          this.players[0].y = 5;
        }
      }
      if (this.players[0].crashWith(this.players[3])) {
        if (this.players[0].eat) {
          this.players[3].destroy(3);
        } else {
          this.players[0].x = 5;
          this.players[0].y = 5;
        }
      }

      // Player 2
      if (this.players[1].crashWith(this.players[0])) {
        if (this.players[1].eat) {
          this.players[0].destroy(0);
        } else {
          this.players[1].x = 5;
          this.players[1].y = 50;
        }
      }
      if (this.players[1].crashWith(this.players[2])) {
        if (this.players[1].eat) {
          this.players[2].destroy(2);
        } else {
          this.players[1].x = 5;
          this.players[1].y = 50;
        }
      }
      if (this.players[1].crashWith(this.players[3])) {
        if (this.players[1].eat) {
          this.players[3].destroy(3);
        } else {
          this.players[1].x = 5;
          this.players[1].y = 50;
        }
      }

      // Player 3
      if (this.players[2].crashWith(this.players[0])) {
        if (this.players[2].eat) {
          this.players[0].destroy(0);
        } else {
          this.players[2].x = 5;
          this.players[2].y = 100;
        }
      }
      if (this.players[2].crashWith(this.players[1])) {
        if (this.players[2].eat) {
          this.players[1].destroy(1);
        } else {
          this.players[2].x = 5;
          this.players[2].y = 100;
        }
      }
      if (this.players[2].crashWith(this.players[3])) {
        if (this.players[2].eat) {
          this.players[3].destroy(3);
        } else {
          this.players[2].x = 5;
          this.players[2].y = 100;
        }
      }

      // Player 4
      if (this.players[3].crashWith(this.players[0])) {
        if (this.players[3].eat) {
          this.players[0].destroy(0);
        } else {
          this.players[2].x = 5;
          this.players[2].y = 150;
        }
      }
      if (this.players[3].crashWith(this.players[1])) {
        if (this.players[3].eat) {
          this.players[1].destroy(1);
        } else {
          this.players[2].x = 5;
          this.players[2].y = 150;
        }
      }
      if (this.players[3].crashWith(this.players[2])) {
        if (this.players[3].eat) {
          this.players[2].destroy(2);
        } else {
          this.players[3].x = 5;
          this.players[3].y = 150;
        }
      }
    } else {
      this.myGameArea.clear();

      let deathCount = 0;
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].speedX = 0;
        this.players[i].speedY = 0;
        if (this.players[i].dead) {
          deathCount++;
        }
      }
      if (this.welcomeScreen) {
        this.myGameArea.context.font = '130px Arial';
        this.myGameArea.context.textAlign = 'center';
        this.myGameArea.context.strokeStyle = 'red';
        this.myGameArea.context.lineWidth = 5;
        this.myGameArea.context.strokeText(
          'GAME ON',
          this.myGameArea.gameCanvas.width / 2,
          this.myGameArea.gameCanvas.height / 2);
      }

      if (deathCount === this.players.length - 1) {
        for (let i = 0; i < this.players.length; i++) {
          if (!this.players[i].dead) {
            this.myGameArea.context.font = '130px Arial';
            this.myGameArea.context.textAlign = 'center';
            this.myGameArea.context.strokeStyle = 'red';
            this.myGameArea.context.lineWidth = 5;
            this.myGameArea.context.strokeText(
              'GAME OVER',
              this.myGameArea.gameCanvas.width / 2,
              this.myGameArea.gameCanvas.height / 2);

            this.myGameArea.context.font = '70px Arial';
            this.myGameArea.context.fillStyle = 'white';
            this.myGameArea.context.fillText(
              'Player ' + this.players[i].number + ' is the winner!',
              this.myGameArea.gameCanvas.width / 2,
              this.myGameArea.gameCanvas.height / 1.63);
          }
        }
        this.myGameArea.stop();
      }
      if (this.myGameArea.keys && this.myGameArea.keys[37]) { this.moveLeft(1); }
      if (this.myGameArea.keys && this.myGameArea.keys[39]) { this.moveRight(1); }
      if (this.myGameArea.keys && this.myGameArea.keys[38]) { this.moveUp(1); }
      if (this.myGameArea.keys && this.myGameArea.keys[40]) { this.moveDown(1); }

      if (this.myGameArea.keys && this.myGameArea.keys[65]) { this.moveLeft(2); }
      if (this.myGameArea.keys && this.myGameArea.keys[68]) { this.moveRight(2); }
      if (this.myGameArea.keys && this.myGameArea.keys[87]) { this.moveUp(2); }
      if (this.myGameArea.keys && this.myGameArea.keys[83]) { this.moveDown(2); }

      if (this.myGameArea.keys && this.myGameArea.keys[67]) { this.moveLeft(3); }
      if (this.myGameArea.keys && this.myGameArea.keys[66]) { this.moveRight(3); }
      if (this.myGameArea.keys && this.myGameArea.keys[70]) { this.moveUp(3); }
      if (this.myGameArea.keys && this.myGameArea.keys[86]) { this.moveDown(3); }

      if (this.myGameArea.keys && this.myGameArea.keys[77]) { this.moveLeft(4); }
      if (this.myGameArea.keys && this.myGameArea.keys[190]) { this.moveRight(4); }
      if (this.myGameArea.keys && this.myGameArea.keys[75]) { this.moveUp(4); }
      if (this.myGameArea.keys && this.myGameArea.keys[188]) { this.moveDown(4); }

      for (let i = 0; i < this.players.length; i++) {
        this.players[i].newPos();
        this.players[i].update();
      }
    }
  }

  moveUp(player) {
    switch (player) {
      case 1:
        this.players[0].direction = 'Up';
        if (this.players[0].y > 2) {
          this.players[0].speedY -= this.speed;
        }
        break;
      case 2:
        this.players[1].direction = 'Up';
        if (this.players[1].y > 2) {
          this.players[1].speedY -= this.speed;
        }
        break;
      case 3:
        this.players[2].direction = 'Up';
        if (this.players[2].y > 2) {
          this.players[2].speedY -= this.speed;
        }
        break;
      case 4:
        this.players[3].direction = 'Up';
        if (this.players[3].y > 2) {
          this.players[3].speedY -= this.speed;
        }
        break;
      default:
        break;
    }
  }

  moveDown(player) {
    switch (player) {
      case 1:
        this.players[0].direction = 'Down';
        if (this.players[0].y < 663) {
          this.players[0].speedY += this.speed;
        }
        break;
      case 2:
        this.players[1].direction = 'Down';
        if (this.players[1].y < 663) {
          this.players[1].speedY += this.speed;
        }
        break;
      case 3:
        this.players[2].direction = 'Down';
        if (this.players[2].y < 663) {
          this.players[2].speedY += this.speed;
        }
        break;
      case 4:
        this.players[3].direction = 'Down';
        if (this.players[3].y < 663) {
          this.players[3].speedY += this.speed;
        }
        break;
      default:
        break;
    }
  }

  moveLeft(player) {
    switch (player) {
      case 1:
        this.players[0].direction = 'Left';
        if (this.players[0].x > 2) {
          this.players[0].speedX -= this.speed;
        }
        break;
      case 2:
        this.players[1].direction = 'Left';
        if (this.players[1].x > 2) {
          this.players[1].speedX -= this.speed;
        }
        break;
      case 3:
        this.players[2].direction = 'Left';
        if (this.players[2].x > 2) {
          this.players[2].speedX -= this.speed;
        }
        break;
      case 4:
        this.players[3].direction = 'Left';
        if (this.players[3].x > 2) {
          this.players[3].speedX -= this.speed;
        }
        break;
      default:
        break;
    }
  }

  moveRight(player) {
    switch (player) {
      case 1:
        this.players[0].direction = 'Right';
        if (this.players[0].x < 1021) {
          this.players[0].speedX += this.speed;
        }
        break;
      case 2:
        this.players[1].direction = 'Right';
        if (this.players[1].x < 1021) {
          this.players[1].speedX += this.speed;
        }
        break;
      case 3:
        this.players[2].direction = 'Right';
        if (this.players[2].x < 1021) {
          this.players[2].speedX += this.speed;
        }
        break;
      case 4:
        this.players[3].direction = 'Right';
        if (this.players[3].x < 1021) {
          this.players[3].speedX += this.speed;
        }
        break;
      default:
        break;
    }
  }

  stopMove(player) {
    switch (player) {
      case 1:
        this.players[0].speedX = 0;
        this.players[0].speedY = 0;
        break;
      case 2:
        this.players[1].speedX = 0;
        this.players[1].speedY = 0;
        break;
      case 3:
        this.players[2].speedX = 0;
        this.players[2].speedY = 0;
        break;
      case 4:
        this.players[3].speedX = 0;
        this.players[3].speedY = 0;
        break;
      default:
        break;
    }
  }
}
