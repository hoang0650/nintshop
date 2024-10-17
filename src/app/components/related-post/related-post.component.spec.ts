import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPostComponent } from './related-post.component';

describe('RelatedPostComponent', () => {
  let component: RelatedPostComponent;
  let fixture: ComponentFixture<RelatedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
