import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRevenueDashboardComponent } from './store-revenue-dashboard.component';

describe('StoreRevenueDashboardComponent', () => {
  let component: StoreRevenueDashboardComponent;
  let fixture: ComponentFixture<StoreRevenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreRevenueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreRevenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
