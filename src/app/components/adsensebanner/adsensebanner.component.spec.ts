import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsensebannerComponent } from './adsensebanner.component';

describe('AdsensebannerComponent', () => {
  let component: AdsensebannerComponent;
  let fixture: ComponentFixture<AdsensebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdsensebannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsensebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
