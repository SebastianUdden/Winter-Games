import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMazeComponent } from './the-maze.component';

describe('TheMazeComponent', () => {
  let component: TheMazeComponent;
  let fixture: ComponentFixture<TheMazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
