import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningSaleComponent } from './lightning-sale.component';

describe('LightningSaleComponent', () => {
  let component: LightningSaleComponent;
  let fixture: ComponentFixture<LightningSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightningSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightningSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
