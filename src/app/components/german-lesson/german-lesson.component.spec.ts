import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanLessonComponent } from './german-lesson.component';

describe('GermanLessonComponent', () => {
  let component: GermanLessonComponent;
  let fixture: ComponentFixture<GermanLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GermanLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GermanLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
