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
import { Team } from '../_models/team';
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
  public players = [];
  public teams = [];
  public teamOneColor = '#974ca8';
  public teamTwoColor = '#2f9267';

  public user: User;
  public welcomeScreen = true;
  public myGameArea;
  public myGamePiece;
  public mapWidth = 1080;
  public mapHeight = 720;
  public fps = 60;
  public second = 1000;
  public refreshRate = this.second / this.fps;
  public baseSpeed = 2;
  public playerSpeed;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
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
          }, this.refreshRate);
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
          }, this.refreshRate);
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
    const startY = 520;
    this.myGameArea.start();
    const startCtx = this.myGameArea.context;
    if (this.firstGame) {
      this.players[0] = new Player(
        1, startCtx, color, this.teamOneColor,
        50, 50, 0, 0, 160, startY,
        '2', 'Q', 'W', 'E');
      this.players[1] = new Player(
        2, startCtx, 'DeepSkyBlue', this.teamTwoColor,
        50, 50, 0, 0, 220, startY,
        '5', 'R', 'T', 'Y');
      this.players[2] = new Player(
        3, startCtx, 'DarkOrange', this.teamOneColor,
        50, 50, 0, 0, 280, startY,
        '8', 'U', 'I', 'O');
      this.players[3] = new Player(
        4, startCtx, 'Green', this.teamTwoColor,
        50, 50, 0, 0, 340, startY,
        '+', 'O', 'P', 'Å');
      this.players[4] = new Player(
        5, startCtx, 'GoldenRod', this.teamOneColor,
        50, 50, 0, 0, 400, startY,
        'A', '&lt;', 'Z', 'X');
      this.players[5] = new Player(
        6, startCtx, 'Violet', this.teamTwoColor,
        50, 50, 0, 0, 460, startY,
        'F', 'C', 'V', 'B');
      this.players[6] = new Player(
        7, startCtx, 'LightSteelBlue', this.teamOneColor,
        50, 50, 0, 0, 520, startY,
        'J', 'N', 'M', ',');
      this.players[7] = new Player(
        8, startCtx, 'Olive', this.teamTwoColor,
        50, 50, 0, 0, 580, startY,
        'Ö', '.', '-', 'Ä');
      this.players[8] = new Player(
        9, startCtx, 'BurlyWood', this.teamOneColor,
        50, 50, 0, 0, 640, startY,
        '^', '&crarr;', '&#x232b;', '`');
      this.players[9] = new Player(
        10, startCtx, 'MediumOrchid', this.teamTwoColor,
        50, 50, 0, 0, 700, startY,
        'Ins', 'Pd', 'Pu', 'End');
      this.players[10] = new Player(
        11, startCtx, 'Peru', this.teamOneColor,
        50, 50, 0, 0, 760, startY,
        '3', '4', '1', '§');
      this.players[11] = new Player(
        12, startCtx, 'SlateGray', this.teamTwoColor,
        50, 50, 0, 0, 820, startY,
        '&uarr;', '&larr;', '&darr;', '&rarr;');
    } else {
      this.players[0] = new Player(
        1, startCtx, color, this.teamOneColor,
        50, 50, 0, 0, 160, startY,
        '2', 'Q', 'W', 'E',
        this.players[0].score, this.players[0].kills, this.players[0].deaths);
      this.players[1] = new Player(
        2, startCtx, 'DeepSkyBlue', this.teamTwoColor,
        50, 50, 0, 0, 220, startY,
        '5', 'R', 'T', 'Y',
        this.players[1].score, this.players[1].kills, this.players[1].deaths);
      this.players[2] = new Player(
        3, startCtx, 'DarkOrange', this.teamOneColor,
        50, 50, 0, 0, 280, startY,
        '8', 'U', 'I', 'O',
        this.players[2].score, this.players[2].kills, this.players[2].deaths);
      this.players[3] = new Player(
        4, startCtx, 'LightSeaGreen', this.teamTwoColor,
        50, 50, 0, 0, 340, startY,
        '+', 'O', 'P', 'Å',
        this.players[3].score, this.players[3].kills, this.players[3].deaths);
      this.players[4] = new Player(
        5, startCtx, 'GoldenRod', this.teamOneColor,
        50, 50, 0, 0, 400, startY,
        'A', '&lt;', 'Z', 'X',
        this.players[4].score, this.players[4].kills, this.players[4].deaths);
      this.players[5] = new Player(
        6, startCtx, 'Violet', this.teamTwoColor,
        50, 50, 0, 0, 460, startY,
        'F', 'C', 'V', 'B',
        this.players[5].score, this.players[5].kills, this.players[5].deaths);
      this.players[6] = new Player(
        7, startCtx, 'LightSteelBlue', this.teamOneColor,
        50, 50, 0, 0, 520, startY,
        'J', 'N', 'M', ',',
        this.players[6].score, this.players[6].kills, this.players[6].deaths);
      this.players[7] = new Player(
        8, startCtx, 'OliveDrab', this.teamTwoColor,
        50, 50, 0, 0, 580, startY,
        'Ö', '.', '-', 'Ä',
        this.players[7].score, this.players[7].kills, this.players[7].deaths);
      this.players[8] = new Player(
        9, startCtx, 'BurlyWood', this.teamOneColor,
        50, 50, 0, 0, 640, startY,
        '^', '&crarr;', '&#x232b;', '`',
        this.players[8].score, this.players[8].kills, this.players[8].deaths);
      this.players[9] = new Player(
        10, startCtx, 'MediumOrchid', this.teamTwoColor,
        50, 50, 0, 0, 700, startY,
        'In', 'Pd', 'Pu', 'En',
        this.players[9].score, this.players[9].kills, this.players[9].deaths);
      this.players[10] = new Player(
        11, startCtx, 'Peru', this.teamOneColor,
        50, 50, 0, 0, 760, startY,
        '3', '4', '1', '§',
        this.players[10].score, this.players[10].kills, this.players[10].deaths);
      this.players[11] = new Player(
        12, startCtx, 'SlateGray', this.teamTwoColor,
        50, 50, 0, 0, 820, startY,
        '&uarr;', '&larr;', '&darr;', '&rarr;',
        this.players[11].score, this.players[11].kills, this.players[11].deaths);
    }

    this.teams = [
      new Team(
        1, 'Ninjas', this.teamOneColor,
        [
          this.players[0],
          this.players[2],
          this.players[4],
          this.players[6],
          this.players[8],
          this.players[10],
        ]
      ),
      new Team(
        1, 'Commandos', this.teamTwoColor,
        [
          this.players[1],
          this.players[3],
          this.players[5],
          this.players[7],
          this.players[9],
          this.players[11]
        ]
      )
    ];
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
      this.players[0].crashWith(this.players[8]) ||
      this.players[0].crashWith(this.players[9]) ||
      this.players[0].crashWith(this.players[10]) ||
      this.players[0].crashWith(this.players[11]) ||

      // Player 2
      this.players[1].crashWith(this.players[0]) ||
      this.players[1].crashWith(this.players[2]) ||
      this.players[1].crashWith(this.players[3]) ||
      this.players[1].crashWith(this.players[4]) ||
      this.players[1].crashWith(this.players[5]) ||
      this.players[1].crashWith(this.players[6]) ||
      this.players[1].crashWith(this.players[7]) ||
      this.players[1].crashWith(this.players[8]) ||
      this.players[1].crashWith(this.players[9]) ||
      this.players[1].crashWith(this.players[10]) ||
      this.players[1].crashWith(this.players[11]) ||

      // Player 3
      this.players[2].crashWith(this.players[0]) ||
      this.players[2].crashWith(this.players[1]) ||
      this.players[2].crashWith(this.players[3]) ||
      this.players[2].crashWith(this.players[4]) ||
      this.players[2].crashWith(this.players[5]) ||
      this.players[2].crashWith(this.players[6]) ||
      this.players[2].crashWith(this.players[7]) ||
      this.players[2].crashWith(this.players[8]) ||
      this.players[2].crashWith(this.players[9]) ||
      this.players[2].crashWith(this.players[10]) ||
      this.players[2].crashWith(this.players[11]) ||

      // Player 4
      this.players[3].crashWith(this.players[0]) ||
      this.players[3].crashWith(this.players[1]) ||
      this.players[3].crashWith(this.players[2]) ||
      this.players[3].crashWith(this.players[4]) ||
      this.players[3].crashWith(this.players[5]) ||
      this.players[3].crashWith(this.players[6]) ||
      this.players[3].crashWith(this.players[7]) ||
      this.players[3].crashWith(this.players[8]) ||
      this.players[3].crashWith(this.players[9]) ||
      this.players[3].crashWith(this.players[10]) ||
      this.players[3].crashWith(this.players[11]) ||

      // Player 5
      this.players[4].crashWith(this.players[0]) ||
      this.players[4].crashWith(this.players[1]) ||
      this.players[4].crashWith(this.players[2]) ||
      this.players[4].crashWith(this.players[3]) ||
      this.players[4].crashWith(this.players[5]) ||
      this.players[4].crashWith(this.players[6]) ||
      this.players[4].crashWith(this.players[7]) ||
      this.players[4].crashWith(this.players[8]) ||
      this.players[4].crashWith(this.players[9]) ||
      this.players[4].crashWith(this.players[10]) ||
      this.players[4].crashWith(this.players[11]) ||

      // Player 6
      this.players[5].crashWith(this.players[0]) ||
      this.players[5].crashWith(this.players[1]) ||
      this.players[5].crashWith(this.players[2]) ||
      this.players[5].crashWith(this.players[3]) ||
      this.players[5].crashWith(this.players[4]) ||
      this.players[5].crashWith(this.players[6]) ||
      this.players[5].crashWith(this.players[7]) ||
      this.players[5].crashWith(this.players[8]) ||
      this.players[5].crashWith(this.players[9]) ||
      this.players[5].crashWith(this.players[10]) ||
      this.players[5].crashWith(this.players[11]) ||

      // Player 7
      this.players[6].crashWith(this.players[0]) ||
      this.players[6].crashWith(this.players[1]) ||
      this.players[6].crashWith(this.players[2]) ||
      this.players[6].crashWith(this.players[3]) ||
      this.players[6].crashWith(this.players[4]) ||
      this.players[6].crashWith(this.players[5]) ||
      this.players[6].crashWith(this.players[7]) ||
      this.players[6].crashWith(this.players[8]) ||
      this.players[6].crashWith(this.players[9]) ||
      this.players[6].crashWith(this.players[10]) ||
      this.players[6].crashWith(this.players[11]) ||

      // Player 8
      this.players[7].crashWith(this.players[0]) ||
      this.players[7].crashWith(this.players[1]) ||
      this.players[7].crashWith(this.players[2]) ||
      this.players[7].crashWith(this.players[3]) ||
      this.players[7].crashWith(this.players[4]) ||
      this.players[7].crashWith(this.players[5]) ||
      this.players[7].crashWith(this.players[6]) ||
      this.players[7].crashWith(this.players[8]) ||
      this.players[7].crashWith(this.players[9]) ||
      this.players[7].crashWith(this.players[10]) ||
      this.players[7].crashWith(this.players[11]) ||

      // Player 9
      this.players[8].crashWith(this.players[0]) ||
      this.players[8].crashWith(this.players[1]) ||
      this.players[8].crashWith(this.players[2]) ||
      this.players[8].crashWith(this.players[3]) ||
      this.players[8].crashWith(this.players[4]) ||
      this.players[8].crashWith(this.players[5]) ||
      this.players[8].crashWith(this.players[6]) ||
      this.players[8].crashWith(this.players[7]) ||
      this.players[8].crashWith(this.players[9]) ||
      this.players[8].crashWith(this.players[10]) ||
      this.players[8].crashWith(this.players[11]) ||

      // Player 10
      this.players[9].crashWith(this.players[0]) ||
      this.players[9].crashWith(this.players[1]) ||
      this.players[9].crashWith(this.players[2]) ||
      this.players[9].crashWith(this.players[3]) ||
      this.players[9].crashWith(this.players[4]) ||
      this.players[9].crashWith(this.players[5]) ||
      this.players[9].crashWith(this.players[6]) ||
      this.players[9].crashWith(this.players[7]) ||
      this.players[9].crashWith(this.players[8]) ||
      this.players[9].crashWith(this.players[10]) ||
      this.players[9].crashWith(this.players[11]) ||

      // Player 11
      this.players[10].crashWith(this.players[0]) ||
      this.players[10].crashWith(this.players[1]) ||
      this.players[10].crashWith(this.players[2]) ||
      this.players[10].crashWith(this.players[3]) ||
      this.players[10].crashWith(this.players[4]) ||
      this.players[10].crashWith(this.players[5]) ||
      this.players[10].crashWith(this.players[6]) ||
      this.players[10].crashWith(this.players[7]) ||
      this.players[10].crashWith(this.players[8]) ||
      this.players[10].crashWith(this.players[9]) ||
      this.players[10].crashWith(this.players[11]) ||

      // Player 12
      this.players[11].crashWith(this.players[0]) ||
      this.players[11].crashWith(this.players[1]) ||
      this.players[11].crashWith(this.players[2]) ||
      this.players[11].crashWith(this.players[3]) ||
      this.players[11].crashWith(this.players[4]) ||
      this.players[11].crashWith(this.players[5]) ||
      this.players[11].crashWith(this.players[6]) ||
      this.players[11].crashWith(this.players[7]) ||
      this.players[11].crashWith(this.players[8]) ||
      this.players[11].crashWith(this.players[9]) ||
      this.players[11].crashWith(this.players[10])
    ) {
      // Player 1 - Team 1(0)
      if (this.players[0].eat) {
        if (this.players[0].crashWith(this.players[1])) { this.players[1].destroy(); this.players[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[0].crashWith(this.players[2])) { this.players[2].destroy(); this.players[0].kills++;
          this.teams[0].teamKills++; this.teams[0].deaths++; }
        if (this.players[0].crashWith(this.players[3])) { this.players[3].destroy(); this.players[0].kills++; this.teams[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[0].crashWith(this.players[4])) { this.players[4].destroy(); this.players[0].kills++;
          this.teams[0].teamKills++; this.teams[0].deaths++; }
        if (this.players[0].crashWith(this.players[5])) { this.players[5].destroy(); this.players[0].kills++; this.teams[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[0].crashWith(this.players[6])) { this.players[6].destroy(); this.players[0].kills++;
          this.teams[0].teamKills++; this.teams[0].deaths++; }
        if (this.players[0].crashWith(this.players[7])) { this.players[7].destroy(); this.players[0].kills++; this.teams[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[0].crashWith(this.players[8])) { this.players[8].destroy(); this.players[0].kills++;
          this.teams[0].teamKills++; this.teams[0].deaths++; }
        if (this.players[0].crashWith(this.players[9])) { this.players[9].destroy(); this.players[0].kills++; this.teams[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[0].crashWith(this.players[10])) { this.players[10].destroy(); this.players[0].kills++;
          this.teams[0].teamKills++; this.teams[0].deaths++; }
        if (this.players[0].crashWith(this.players[11])) { this.players[11].destroy(); this.players[0].kills++; this.teams[0].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }

      // Player 2 - Team 2(1)
      if (this.players[1].eat) {
        if (this.players[1].crashWith(this.players[0])) { this.players[0].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[2])) { this.players[2].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[3])) { this.players[3].destroy(); this.players[1].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[1].crashWith(this.players[4])) { this.players[4].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[5])) { this.players[5].destroy(); this.players[1].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[1].crashWith(this.players[6])) { this.players[6].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[7])) { this.players[7].destroy(); this.players[1].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[1].crashWith(this.players[8])) { this.players[8].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[9])) { this.players[9].destroy(); this.players[1].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[1].crashWith(this.players[10])) { this.players[10].destroy(); this.players[1].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[1].crashWith(this.players[11])) { this.players[11].destroy(); this.players[1].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
      }

      // Player 3 - Team 1(0)
      if (this.players[2].eat) {
        if (this.players[2].crashWith(this.players[0])) { this.players[0].destroy(); this.players[2].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[1])) { this.players[1].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[3])) { this.players[3].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[4])) { this.players[4].destroy(); this.players[2].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[5])) { this.players[5].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[6])) { this.players[6].destroy(); this.players[2].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[7])) { this.players[7].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[8])) { this.players[8].destroy(); this.players[2].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[9])) { this.players[9].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[10])) { this.players[10].destroy(); this.players[2].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[2].crashWith(this.players[11])) { this.players[11].destroy(); this.players[2].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }
      // Player 4 - Team 2(1)
      if (this.players[3].eat) {
        if (this.players[3].crashWith(this.players[0])) { this.players[0].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[1])) { this.players[1].destroy(); this.players[3].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[3].crashWith(this.players[2])) { this.players[2].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[4])) { this.players[4].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[5])) { this.players[5].destroy(); this.players[3].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[3].crashWith(this.players[6])) { this.players[6].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[7])) { this.players[7].destroy(); this.players[3].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[3].crashWith(this.players[8])) { this.players[8].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[9])) { this.players[9].destroy(); this.players[3].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[3].crashWith(this.players[10])) { this.players[10].destroy(); this.players[3].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[3].crashWith(this.players[11])) { this.players[11].destroy(); this.players[3].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
      }

      // Player 5 - Team 1(0)
      if (this.players[4].eat) {
        if (this.players[4].crashWith(this.players[0])) { this.players[0].destroy(); this.players[4].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[1])) { this.players[1].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[2])) { this.players[2].destroy(); this.players[4].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[3])) { this.players[3].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[5])) { this.players[5].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[6])) { this.players[6].destroy(); this.players[4].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[7])) { this.players[7].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[8])) { this.players[8].destroy(); this.players[4].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[9])) { this.players[9].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[10])) { this.players[10].destroy(); this.players[4].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[4].crashWith(this.players[11])) { this.players[11].destroy(); this.players[4].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }

      // Player 6 - Team 2(1)
      if (this.players[5].eat) {
        if (this.players[5].crashWith(this.players[0])) { this.players[0].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[1])) { this.players[1].destroy(); this.players[5].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[5].crashWith(this.players[2])) { this.players[2].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[3])) { this.players[3].destroy(); this.players[5].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[5].crashWith(this.players[4])) { this.players[4].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[6])) { this.players[6].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[7])) { this.players[7].destroy(); this.players[5].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[5].crashWith(this.players[8])) { this.players[8].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[9])) { this.players[9].destroy(); this.players[5].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[5].crashWith(this.players[10])) { this.players[10].destroy(); this.players[5].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[5].crashWith(this.players[11])) { this.players[11].destroy(); this.players[5].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
      }

      // Player 7 - Team 1(0)
      if (this.players[6].eat) {
        if (this.players[6].crashWith(this.players[0])) { this.players[0].destroy(); this.players[6].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[1])) { this.players[1].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[2])) { this.players[2].destroy(); this.players[6].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[3])) { this.players[3].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[4])) { this.players[4].destroy(); this.players[6].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[5])) { this.players[5].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[7])) { this.players[7].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[8])) { this.players[8].destroy(); this.players[6].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[9])) { this.players[9].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[10])) { this.players[10].destroy(); this.players[6].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[6].crashWith(this.players[11])) { this.players[11].destroy(); this.players[6].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }

      // Player 8 - Team 2(1)
      if (this.players[7].eat) {
        if (this.players[7].crashWith(this.players[0])) { this.players[0].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[1])) { this.players[1].destroy(); this.players[7].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[7].crashWith(this.players[2])) { this.players[2].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[3])) { this.players[3].destroy(); this.players[7].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[7].crashWith(this.players[4])) { this.players[4].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[5])) { this.players[5].destroy(); this.players[7].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[7].crashWith(this.players[6])) { this.players[6].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[8])) { this.players[8].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[9])) { this.players[9].destroy(); this.players[7].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[7].crashWith(this.players[10])) { this.players[10].destroy(); this.players[7].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[7].crashWith(this.players[11])) { this.players[11].destroy(); this.players[7].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
      }

      // Player 9 - Team 1(0)
      if (this.players[8].eat) {
        if (this.players[8].crashWith(this.players[0])) { this.players[0].destroy(); this.players[8].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[1])) { this.players[1].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[2])) { this.players[2].destroy(); this.players[8].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[3])) { this.players[3].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[4])) { this.players[4].destroy(); this.players[8].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[5])) { this.players[5].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[6])) { this.players[6].destroy(); this.players[8].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[7])) { this.players[7].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[9])) { this.players[9].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[10])) { this.players[10].destroy(); this.players[8].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[8].crashWith(this.players[11])) { this.players[11].destroy(); this.players[8].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }

      // Player 10 - Team 2(1)
      if (this.players[9].eat) {
        if (this.players[9].crashWith(this.players[0])) { this.players[0].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[1])) { this.players[1].destroy(); this.players[9].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[9].crashWith(this.players[2])) { this.players[2].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[3])) { this.players[3].destroy(); this.players[9].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[9].crashWith(this.players[4])) { this.players[4].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[5])) { this.players[5].destroy(); this.players[9].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[9].crashWith(this.players[6])) { this.players[6].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[7])) { this.players[7].destroy(); this.players[9].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[9].crashWith(this.players[8])) { this.players[8].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[10])) { this.players[10].destroy(); this.players[9].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[9].crashWith(this.players[11])) { this.players[11].destroy(); this.players[9].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
      }

      // Player 11 - Team 1(0)
      if (this.players[10].eat) {
        if (this.players[10].crashWith(this.players[0])) { this.players[0].destroy(); this.players[10].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[1])) { this.players[1].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[2])) { this.players[2].destroy(); this.players[10].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[3])) { this.players[3].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[4])) { this.players[4].destroy(); this.players[10].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[5])) { this.players[5].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[6])) { this.players[6].destroy(); this.players[10].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[7])) { this.players[7].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[8])) { this.players[8].destroy(); this.players[10].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[9])) { this.players[9].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
        if (this.players[10].crashWith(this.players[11])) { this.players[11].destroy(); this.players[10].kills++;
          this.teams[0].kills++; this.teams[1].deaths++; }
      }

      // Player 12 - Team 2(1)
      if (this.players[11].eat) {
        if (this.players[11].crashWith(this.players[0])) { this.players[0].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[11].crashWith(this.players[1])) { this.players[1].destroy(); this.players[11].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[11].crashWith(this.players[2])) { this.players[2].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[11].crashWith(this.players[3])) { this.players[3].destroy(); this.players[11].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[11].crashWith(this.players[4])) { this.players[4].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[11].crashWith(this.players[5])) { this.players[5].destroy(); this.players[11].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[11].crashWith(this.players[6])) { this.players[6].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[11].crashWith(this.players[7])) { this.players[7].destroy(); this.players[11].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[11].crashWith(this.players[8])) { this.players[8].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
        if (this.players[11].crashWith(this.players[9])) { this.players[9].destroy(); this.players[11].kills++;
          this.teams[1].teamKills++; this.teams[1].deaths++; }
        if (this.players[11].crashWith(this.players[10])) { this.players[10].destroy(); this.players[11].kills++;
          this.teams[1].kills++; this.teams[0].deaths++; }
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

      // Player 9
      if (this.myGameArea.keys && this.myGameArea.keys[186]) { this.point('Up', 8); }
      if (this.myGameArea.keys && this.myGameArea.keys[191]) { this.point('Left', 8); }
      if (this.myGameArea.keys && this.myGameArea.keys[13]) { this.point('Down', 8); }
      if (this.myGameArea.keys && this.myGameArea.keys[8]) { this.point('Right', 8); }

      // Player 10
      if (this.myGameArea.keys && this.myGameArea.keys[45]) { this.point('Up', 9); }
      if (this.myGameArea.keys && this.myGameArea.keys[34]) { this.point('Left', 9); }
      if (this.myGameArea.keys && this.myGameArea.keys[33]) { this.point('Down', 9); }
      if (this.myGameArea.keys && this.myGameArea.keys[35]) { this.point('Right', 9); }

      // Player 11
      if (this.myGameArea.keys && this.myGameArea.keys[51]) { this.point('Up', 10); }
      if (this.myGameArea.keys && this.myGameArea.keys[52]) { this.point('Left', 10); }
      if (this.myGameArea.keys && this.myGameArea.keys[49]) { this.point('Down', 10); }
      if (this.myGameArea.keys && this.myGameArea.keys[220]) { this.point('Right', 10); }

      // Player 12
      if (this.myGameArea.keys && this.myGameArea.keys[38]) { this.point('Up', 11); }
      if (this.myGameArea.keys && this.myGameArea.keys[37]) { this.point('Left', 11); }
      if (this.myGameArea.keys && this.myGameArea.keys[40]) { this.point('Down', 11); }
      if (this.myGameArea.keys && this.myGameArea.keys[39]) { this.point('Right', 11); }

      for (let i = 0; i < this.players.length; i++) {
        this.players[i].newPos();
        this.players[i].update();
      }

      if (deathCount === this.players.length - 1) {
        this.myGameArea.stop();
        this.welcomeScreen = false;
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
            if (i % 2 === 0) {
              this.teams[0].score++;
            } else {
              this.teams[1].score++;
            }
          }
        }
      }
    }
  }

  point(direction, player) {
    this.players[player].direction = direction;
  }

  stopMove(player) {
    this.players[player].speedX = 0;
    this.players[player].speedY = 0;
  }
}
