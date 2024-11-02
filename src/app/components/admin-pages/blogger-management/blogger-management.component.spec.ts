import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerManagementComponent } from './blogger-management.component';

describe('BloggerManagementComponent', () => {
  let component: BloggerManagementComponent;
  let fixture: ComponentFixture<BloggerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloggerManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloggerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
