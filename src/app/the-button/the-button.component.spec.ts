import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheButtonComponent } from './the-button.component';

describe('TheButtonComponent', () => {
  let component: TheButtonComponent;
  let fixture: ComponentFixture<TheButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
