import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDuelComponent } from './the-duel.component';

describe('TheDuelComponent', () => {
  let component: TheDuelComponent;
  let fixture: ComponentFixture<TheDuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheDuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheDuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
