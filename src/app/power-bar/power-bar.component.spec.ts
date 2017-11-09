import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBarComponent } from './power-bar.component';

describe('PowerBarComponent', () => {
  let component: PowerBarComponent;
  let fixture: ComponentFixture<PowerBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
