import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Typed from 'typed.js';
declare var jQuery: any;

@Component({
  selector: 'app-the-story',
  templateUrl: './the-story.component.html',
  styleUrls: ['./the-story.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheStoryComponent implements OnInit {
  public badgers = false;
  public drunk = false;
  public type;
  public typeSpeed = 25;
  public chapter = 0;
  public devChapterTimeOuts = [
    1,  // The Staircase
    1,  // The West Wing
    1,  // The Great Hall
    14000,  // The Badger
    1,  // The Bar
    14000  // The Dancefloor
  ];
  public chapterTimeOuts = [
    21000,  // 0: The Staircase
    15000,  // 1: The West Wing
    18000,  // 2: The Great Hall
    14000,  // 3: The Badger
    18000,  // 4: The Bar
    14000  // The Dancefloor
  ];
  public chapterInputs = [
    false,
    false,
    false
  ];

  constructor() { }

  ngOnInit() {
    this.chapterToggle(0);
  }

  chapterToggle(chapter) {
    this.chapter = chapter;
    this.type = new Typed('#typed' + chapter, {
      stringsElement: '#chapter' + chapter,
      typeSpeed: this.typeSpeed,
      backSpeed: 0,
      loop: false
    });
    this.chapterInputToggle(chapter);
  }

  chapterInputToggle(chapter) {
    for (let i = 0; i < this.chapterInputs.length; i++) {
      this.chapterInputs[i] = false;
    }
    let timeOut = 14000;
    if (chapter < 20) {
      timeOut = this.chapterTimeOuts[chapter];
    }
    setTimeout(() => {
      this.chapterInputs[chapter] = true;
    }, timeOut);
  }
}
