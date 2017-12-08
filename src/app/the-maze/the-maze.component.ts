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
  public gameCount = 1;
  public firstGame = true;
  public gameOver = true;
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
  public baseSpeed = 2;
  public playerSpeed;

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
    this.firstGame = false;
    this.gameOver = false;
    this.gameCount++;
    const self = this;
    self.playerSpeed = this.baseSpeed;
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
      this.firstGame = true;
      this.gameOver = false;
      const self = this;
      self.welcomeScreen = true;
      self.playerSpeed = this.baseSpeed;

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
    if (this.firstGame) {
      this.players[0] = new Player(1, startCtx, color,
        50, 50, 0, 0, 20, 0,
        '2', 'Q', 'W', 'E');
      this.players[1] = new Player(2, startCtx, 'DeepSkyBlue',
        50, 50, 0, 0, 80, 0,
        '5', 'R', 'T', 'Y');
      this.players[2] = new Player(3, startCtx, 'DarkOrange',
        50, 50, 0, 0, 140, 0,
        '8', 'U', 'I', 'O');
      this.players[3] = new Player(4, startCtx, 'Green',
        50, 50, 0, 0, 200, 0,
        '+', 'O', 'P', 'Å');
      this.players[4] = new Player(5, startCtx, 'GoldenRod',
        50, 50, 0, 0, 260, 0,
        'A', '&lt;', 'Z', 'X');
      this.players[5] = new Player(6, startCtx, 'Violet',
        50, 50, 0, 0, 320, 0,
        'F', 'C', 'V', 'B');
      this.players[6] = new Player(7, startCtx, 'LightSteelBlue',
        50, 50, 0, 0, 380, 0,
        'J', 'N', 'M', ',');
      this.players[7] = new Player(8, startCtx, 'Olive',
        50, 50, 0, 0, 440, 0,
        'Ö', '.', '-', 'Ä');
    }

    this.players[0] = new Player(1, startCtx, color,
                                50, 50, 0, 0, 20, 0,
                                '2', 'Q', 'W', 'E',
                                this.players[0].score, this.players[0].kills, this.players[0].deaths);
    this.players[1] = new Player(2, startCtx, 'DeepSkyBlue',
                                50, 50, 0, 0, 80, 0,
                                '5', 'R', 'T', 'Y',
                                this.players[1].score, this.players[1].kills, this.players[1].deaths);
    this.players[2] = new Player(3, startCtx, 'DarkOrange',
                                50, 50, 0, 0, 140, 0,
                                '8', 'U', 'I', 'O',
                                this.players[2].score, this.players[2].kills, this.players[2].deaths);
    this.players[3] = new Player(4, startCtx, 'LightSeaGreen',
                                50, 50, 0, 0, 200, 0,
                                '+', 'O', 'P', 'Å',
                                this.players[3].score, this.players[3].kills, this.players[3].deaths);
    this.players[4] = new Player(5, startCtx, 'GoldenRod',
                                50, 50, 0, 0, 260, 0,
                                'A', '&lt;', 'Z', 'X',
                                this.players[4].score, this.players[4].kills, this.players[4].deaths);
    this.players[5] = new Player(6, startCtx, 'Violet',
                                50, 50, 0, 0, 320, 0,
                                'F', 'C', 'V', 'B',
                                this.players[5].score, this.players[5].kills, this.players[5].deaths);
    this.players[6] = new Player(7, startCtx, 'LightSteelBlue',
                                50, 50, 0, 0, 380, 0,
                                'J', 'N', 'M', ',',
                                this.players[6].score, this.players[6].kills, this.players[6].deaths);
    this.players[7] = new Player(8, startCtx, 'OliveDrab',
                                50, 50, 0, 0, 440, 0,
                                'Ö', '.', '-', 'Ä',
                                this.players[7].score, this.players[7].kills, this.players[7].deaths);

  }

  updateGameArea() {
    this.playerSpeed = this.baseSpeed;

    if (this.welcomeScreen) {
      this.playerSpeed = this.baseSpeed;
    }
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].speedX = 0;
      this.players[i].speedY = 0;

      if (this.players[i].direction === 'Up' && this.players[i].y > 2) {
        this.players[i].speedY -= this.playerSpeed;
      } else if (this.players[i].direction === 'Left' && this.players[i].x > 2) {
        this.players[i].speedX -= this.playerSpeed;
      } else if (this.players[i].direction === 'Down' && this.players[i].y < 663) {
        this.players[i].speedY += this.playerSpeed;
      } else if (this.players[i].direction === 'Right' && this.players[i].x < 1021) {
        this.players[i].speedX += this.playerSpeed;
      }
    }

    if (
      // Player 1
      this.players[0].crashWith(this.players[1]) ||
      this.players[0].crashWith(this.players[2]) ||
      this.players[0].crashWith(this.players[3]) ||
      this.players[0].crashWith(this.players[4]) ||
      this.players[0].crashWith(this.players[5]) ||
      this.players[0].crashWith(this.players[6]) ||
      this.players[0].crashWith(this.players[7]) ||

      // Player 2
      this.players[1].crashWith(this.players[0]) ||
      this.players[1].crashWith(this.players[2]) ||
      this.players[1].crashWith(this.players[3]) ||
      this.players[1].crashWith(this.players[4]) ||
      this.players[1].crashWith(this.players[5]) ||
      this.players[1].crashWith(this.players[6]) ||
      this.players[1].crashWith(this.players[7]) ||

      // Player 3
      this.players[2].crashWith(this.players[0]) ||
      this.players[2].crashWith(this.players[1]) ||
      this.players[2].crashWith(this.players[3]) ||
      this.players[2].crashWith(this.players[4]) ||
      this.players[2].crashWith(this.players[5]) ||
      this.players[2].crashWith(this.players[6]) ||
      this.players[2].crashWith(this.players[7]) ||

      // Player 4
      this.players[3].crashWith(this.players[0]) ||
      this.players[3].crashWith(this.players[1]) ||
      this.players[3].crashWith(this.players[2]) ||
      this.players[3].crashWith(this.players[4]) ||
      this.players[3].crashWith(this.players[5]) ||
      this.players[3].crashWith(this.players[6]) ||
      this.players[3].crashWith(this.players[7]) ||

      // Player 5
      this.players[4].crashWith(this.players[0]) ||
      this.players[4].crashWith(this.players[1]) ||
      this.players[4].crashWith(this.players[2]) ||
      this.players[4].crashWith(this.players[3]) ||
      this.players[4].crashWith(this.players[5]) ||
      this.players[4].crashWith(this.players[6]) ||
      this.players[4].crashWith(this.players[7]) ||

      // Player 6
      this.players[5].crashWith(this.players[0]) ||
      this.players[5].crashWith(this.players[1]) ||
      this.players[5].crashWith(this.players[2]) ||
      this.players[5].crashWith(this.players[3]) ||
      this.players[5].crashWith(this.players[4]) ||
      this.players[5].crashWith(this.players[6]) ||
      this.players[5].crashWith(this.players[7]) ||

      // Player 7
      this.players[6].crashWith(this.players[0]) ||
      this.players[6].crashWith(this.players[1]) ||
      this.players[6].crashWith(this.players[2]) ||
      this.players[6].crashWith(this.players[3]) ||
      this.players[6].crashWith(this.players[4]) ||
      this.players[6].crashWith(this.players[5]) ||
      this.players[6].crashWith(this.players[7]) ||

      // Player 7
      this.players[7].crashWith(this.players[0]) ||
      this.players[7].crashWith(this.players[1]) ||
      this.players[7].crashWith(this.players[2]) ||
      this.players[7].crashWith(this.players[3]) ||
      this.players[7].crashWith(this.players[4]) ||
      this.players[7].crashWith(this.players[5]) ||
      this.players[7].crashWith(this.players[6])
    ) {
      // Player 1
      if (this.players[0].eat) {
        if (this.players[0].crashWith(this.players[1])) { this.players[1].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[2])) { this.players[2].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[3])) { this.players[3].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[4])) { this.players[4].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[5])) { this.players[5].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[6])) { this.players[6].destroy(); this.players[0].kills++; }
        if (this.players[0].crashWith(this.players[7])) { this.players[7].destroy(); this.players[0].kills++; }
      }

      // Player 2
      if (this.players[1].eat) {
        if (this.players[1].crashWith(this.players[0])) { this.players[0].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[2])) { this.players[2].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[3])) { this.players[3].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[4])) { this.players[4].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[5])) { this.players[5].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[6])) { this.players[6].destroy(); this.players[1].kills++; }
        if (this.players[1].crashWith(this.players[7])) { this.players[7].destroy(); this.players[1].kills++; }
      }

      // Player 3
      if (this.players[2].eat) {
        if (this.players[2].crashWith(this.players[0])) { this.players[0].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[1])) { this.players[1].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[3])) { this.players[3].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[4])) { this.players[4].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[5])) { this.players[5].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[6])) { this.players[6].destroy(); this.players[2].kills++; }
        if (this.players[2].crashWith(this.players[7])) { this.players[7].destroy(); this.players[2].kills++; }
      }
      // Player 4
      if (this.players[3].eat) {
        if (this.players[3].crashWith(this.players[0])) { this.players[0].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[1])) { this.players[1].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[2])) { this.players[2].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[4])) { this.players[4].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[5])) { this.players[5].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[6])) { this.players[6].destroy(); this.players[3].kills++; }
        if (this.players[3].crashWith(this.players[7])) { this.players[7].destroy(); this.players[3].kills++; }
      }

      // Player 5
      if (this.players[4].eat) {
        if (this.players[4].crashWith(this.players[0])) { this.players[0].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[1])) { this.players[1].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[2])) { this.players[2].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[3])) { this.players[3].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[5])) { this.players[5].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[6])) { this.players[6].destroy(); this.players[4].kills++; }
        if (this.players[4].crashWith(this.players[7])) { this.players[7].destroy(); this.players[4].kills++; }
      }

      // Player 6
      if (this.players[5].eat) {
        if (this.players[5].crashWith(this.players[0])) { this.players[0].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[1])) { this.players[1].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[2])) { this.players[2].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[3])) { this.players[3].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[4])) { this.players[4].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[6])) { this.players[6].destroy(); this.players[5].kills++; }
        if (this.players[5].crashWith(this.players[7])) { this.players[7].destroy(); this.players[5].kills++; }
      }

      // Player 7
      if (this.players[6].eat) {
        if (this.players[6].crashWith(this.players[0])) { this.players[0].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[1])) { this.players[1].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[2])) { this.players[2].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[3])) { this.players[3].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[4])) { this.players[4].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[5])) { this.players[5].destroy(); this.players[6].kills++; }
        if (this.players[6].crashWith(this.players[7])) { this.players[7].destroy(); this.players[6].kills++; }
      }

      // Player 8
      if (this.players[7].eat) {
        if (this.players[7].crashWith(this.players[0])) { this.players[0].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[1])) { this.players[1].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[2])) { this.players[2].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[3])) { this.players[3].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[4])) { this.players[4].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[5])) { this.players[5].destroy(); this.players[7].kills++; }
        if (this.players[7].crashWith(this.players[6])) { this.players[6].destroy(); this.players[7].kills++; }
      }
    } else {
      this.myGameArea.clear();

      let deathCount = 0;
      for (let i = 0; i < this.players.length; i++) {
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

      // Player 1
      if (this.myGameArea.keys && this.myGameArea.keys[50]) { this.point('Up', 0); }
      if (this.myGameArea.keys && this.myGameArea.keys[81]) { this.point('Left', 0); }
      if (this.myGameArea.keys && this.myGameArea.keys[87]) { this.point('Down', 0); }
      if (this.myGameArea.keys && this.myGameArea.keys[69]) { this.point('Right', 0); }

      // Player 2
      if (this.myGameArea.keys && this.myGameArea.keys[53]) { this.point('Up', 1); }
      if (this.myGameArea.keys && this.myGameArea.keys[82]) { this.point('Left', 1); }
      if (this.myGameArea.keys && this.myGameArea.keys[84]) { this.point('Down', 1); }
      if (this.myGameArea.keys && this.myGameArea.keys[89]) { this.point('Right', 1); }

      // Player 3
      if (this.myGameArea.keys && this.myGameArea.keys[56]) { this.point('Up', 2); }
      if (this.myGameArea.keys && this.myGameArea.keys[85]) { this.point('Left', 2); }
      if (this.myGameArea.keys && this.myGameArea.keys[73]) { this.point('Down', 2); }
      if (this.myGameArea.keys && this.myGameArea.keys[79]) { this.point('Right', 2); }

      // Player 4
      if (this.myGameArea.keys && this.myGameArea.keys[187]) { this.point('Up', 3); }
      if (this.myGameArea.keys && this.myGameArea.keys[80]) { this.point('Left', 3); }
      if (this.myGameArea.keys && this.myGameArea.keys[221]) { this.point('Down', 3); }
      if (this.myGameArea.keys && this.myGameArea.keys[186]) { this.point('Right', 3); }

      // Player 5
      if (this.myGameArea.keys && this.myGameArea.keys[65]) { this.point('Up', 4); }
      if (this.myGameArea.keys && this.myGameArea.keys[226]) { this.point('Left', 4); }
      if (this.myGameArea.keys && this.myGameArea.keys[90]) { this.point('Down', 4); }
      if (this.myGameArea.keys && this.myGameArea.keys[88]) { this.point('Right', 4); }

      // Player 6
      if (this.myGameArea.keys && this.myGameArea.keys[70]) { this.point('Up', 5); }
      if (this.myGameArea.keys && this.myGameArea.keys[67]) { this.point('Left', 5); }
      if (this.myGameArea.keys && this.myGameArea.keys[86]) { this.point('Down', 5); }
      if (this.myGameArea.keys && this.myGameArea.keys[66]) { this.point('Right', 5); }

      // Player 7
      if (this.myGameArea.keys && this.myGameArea.keys[74]) { this.point('Up', 6); }
      if (this.myGameArea.keys && this.myGameArea.keys[78]) { this.point('Left', 6); }
      if (this.myGameArea.keys && this.myGameArea.keys[77]) { this.point('Down', 6); }
      if (this.myGameArea.keys && this.myGameArea.keys[188]) { this.point('Right', 6); }

      // Player 8
      if (this.myGameArea.keys && this.myGameArea.keys[192]) { this.point('Up', 7); }
      if (this.myGameArea.keys && this.myGameArea.keys[190]) { this.point('Left', 7); }
      if (this.myGameArea.keys && this.myGameArea.keys[189]) { this.point('Down', 7); }
      if (this.myGameArea.keys && this.myGameArea.keys[222]) { this.point('Right', 7); }

      for (let i = 0; i < this.players.length; i++) {
        this.players[i].newPos();
        this.players[i].update();
      }

      if (deathCount === this.players.length - 1) {
        this.myGameArea.stop();
        this.gameOver = true;
        for (let i = 0; i < this.players.length; i++) {
          this.players[i].speedX = 0;
          this.players[i].speedY = 0;
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
            this.players[i].score++;
          }
        }
      }
    }
  }

  point(direction, player) {
    this.players[player].direction = direction;
  }

  moveUp(player) {
    switch (player) {
      case 0:
        this.players[0].direction = 'Up';
        if (this.players[0].y > 2) {
          this.players[0].speedY -= this.playerSpeed;
        }
        break;
      case 1:
        this.players[1].direction = 'Up';
        if (this.players[1].y > 2) {
          this.players[1].speedY -= this.playerSpeed;
        }
        break;
      case 2:
        this.players[2].direction = 'Up';
        if (this.players[2].y > 2) {
          this.players[2].speedY -= this.playerSpeed;
        }
        break;
      case 3:
        this.players[3].direction = 'Up';
        if (this.players[3].y > 2) {
          this.players[3].speedY -= this.playerSpeed;
        }
        break;
      case 4:
        this.players[4].direction = 'Up';
        if (this.players[4].y > 2) {
          this.players[4].speedY -= this.playerSpeed;
        }
        break;
      case 5:
        this.players[5].direction = 'Up';
        if (this.players[5].y > 2) {
          this.players[5].speedY -= this.playerSpeed;
        }
        break;
      case 6:
        this.players[6].direction = 'Up';
        if (this.players[6].y > 2) {
          this.players[6].speedY -= this.playerSpeed;
        }
        break;
      case 7:
        this.players[7].direction = 'Up';
        if (this.players[7].y > 2) {
          this.players[7].speedY -= this.playerSpeed;
        }
        break;
      default:
        break;
    }
  }

  moveDown(player) {
    switch (player) {
      case 0:
        this.players[0].direction = 'Down';
        if (this.players[0].y < 663) {
          this.players[0].speedY += this.playerSpeed;
        }
        break;
      case 1:
        this.players[1].direction = 'Down';
        if (this.players[1].y < 663) {
          this.players[1].speedY += this.playerSpeed;
        }
        break;
      case 2:
        this.players[2].direction = 'Down';
        if (this.players[2].y < 663) {
          this.players[2].speedY += this.playerSpeed;
        }
        break;
      case 3:
        this.players[3].direction = 'Down';
        if (this.players[3].y < 663) {
          this.players[3].speedY += this.playerSpeed;
        }
        break;
      case 4:
        this.players[4].direction = 'Down';
        if (this.players[4].y < 663) {
          this.players[4].speedY += this.playerSpeed;
        }
        break;
      case 5:
        this.players[5].direction = 'Down';
        if (this.players[5].y < 663) {
          this.players[5].speedY += this.playerSpeed;
        }
        break;
      case 6:
        this.players[6].direction = 'Down';
        if (this.players[6].y < 663) {
          this.players[6].speedY += this.playerSpeed;
        }
        break;
      case 7:
        this.players[7].direction = 'Down';
        if (this.players[7].y < 663) {
          this.players[7].speedY += this.playerSpeed;
        }
        break;
      default:
        break;
    }
  }

  moveLeft(player) {
    switch (player) {
      case 0:
        this.players[0].direction = 'Left';
        if (this.players[0].x > 2) {
          this.players[0].speedX -= this.playerSpeed;
        }
        break;
      case 1:
        this.players[1].direction = 'Left';
        if (this.players[1].x > 2) {
          this.players[1].speedX -= this.playerSpeed;
        }
        break;
      case 2:
        this.players[2].direction = 'Left';
        if (this.players[2].x > 2) {
          this.players[2].speedX -= this.playerSpeed;
        }
        break;
      case 3:
        this.players[3].direction = 'Left';
        if (this.players[3].x > 2) {
          this.players[3].speedX -= this.playerSpeed;
        }
        break;
      case 4:
        this.players[4].direction = 'Left';
        if (this.players[4].x > 2) {
          this.players[4].speedX -= this.playerSpeed;
        }
        break;
      case 5:
        this.players[5].direction = 'Left';
        if (this.players[5].x > 2) {
          this.players[5].speedX -= this.playerSpeed;
        }
        break;
      case 6:
        this.players[6].direction = 'Left';
        if (this.players[6].x > 2) {
          this.players[6].speedX -= this.playerSpeed;
        }
        break;
      case 7:
        this.players[7].direction = 'Left';
        if (this.players[7].x > 2) {
          this.players[7].speedX -= this.playerSpeed;
        }
        break;
      default:
        break;
    }
  }

  moveRight(player) {
    switch (player) {
      case 0:
        this.players[0].direction = 'Right';
        if (this.players[0].x < 1021) {
          this.players[0].speedX += this.playerSpeed;
        }
        break;
      case 1:
        this.players[1].direction = 'Right';
        if (this.players[1].x < 1021) {
          this.players[1].speedX += this.playerSpeed;
        }
        break;
      case 2:
        this.players[2].direction = 'Right';
        if (this.players[2].x < 1021) {
          this.players[2].speedX += this.playerSpeed;
        }
        break;
      case 3:
        this.players[3].direction = 'Right';
        if (this.players[3].x < 1021) {
          this.players[3].speedX += this.playerSpeed;
        }
        break;
      case 4:
        this.players[4].direction = 'Right';
        if (this.players[4].x < 1021) {
          this.players[4].speedX += this.playerSpeed;
        }
        break;
      case 5:
        this.players[5].direction = 'Right';
        if (this.players[5].x < 1021) {
          this.players[5].speedX += this.playerSpeed;
        }
        break;
      case 6:
        this.players[6].direction = 'Right';
        if (this.players[6].x < 1021) {
          this.players[6].speedX += this.playerSpeed;
        }
        break;
      case 7:
        this.players[7].direction = 'Right';
        if (this.players[7].x < 1021) {
          this.players[7].speedX += this.playerSpeed;
        }
        break;
      default:
        break;
    }
  }

  stopMove(player) {
    switch (player) {
      case 0:
        this.players[0].speedX = 0;
        this.players[0].speedY = 0;
        break;
      case 1:
        this.players[1].speedX = 0;
        this.players[1].speedY = 0;
        break;
      case 2:
        this.players[2].speedX = 0;
        this.players[2].speedY = 0;
        break;
      case 3:
        this.players[3].speedX = 0;
        this.players[3].speedY = 0;
        break;
      case 4:
        this.players[4].speedX = 0;
        this.players[4].speedY = 0;
        break;
      case 5:
        this.players[5].speedX = 0;
        this.players[5].speedY = 0;
        break;
      case 6:
        this.players[6].speedX = 0;
        this.players[6].speedY = 0;
        break;
      case 7:
        this.players[7].speedX = 0;
        this.players[7].speedY = 0;
        break;
      default:
        break;
    }
  }
}
