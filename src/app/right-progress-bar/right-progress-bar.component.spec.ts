import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightProgressBarComponent } from './right-progress-bar.component';

describe('RightProgressBarComponent', () => {
  let component: RightProgressBarComponent;
  let fixture: ComponentFixture<RightProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
