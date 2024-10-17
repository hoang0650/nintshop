import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBlogComponent } from './comment-blog.component';

describe('CommentBlogComponent', () => {
  let component: CommentBlogComponent;
  let fixture: ComponentFixture<CommentBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
