import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerRevenueDashboardComponent } from './blogger-revenue-dashboard.component';

describe('BloggerRevenueDashboardComponent', () => {
  let component: BloggerRevenueDashboardComponent;
  let fixture: ComponentFixture<BloggerRevenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloggerRevenueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloggerRevenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
