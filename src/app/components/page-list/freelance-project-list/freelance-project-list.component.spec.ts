import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceProjectListComponent } from './freelance-project-list.component';

describe('FreelanceProjectListComponent', () => {
  let component: FreelanceProjectListComponent;
  let fixture: ComponentFixture<FreelanceProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelanceProjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelanceProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
