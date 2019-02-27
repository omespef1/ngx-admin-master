import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlomeComponent } from './blome.component';

describe('BlomeComponent', () => {
  let component: BlomeComponent;
  let fixture: ComponentFixture<BlomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
