import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreamHomepageComponent } from './livestream-homepage.component';

describe('LivestreamHomepageComponent', () => {
  let component: LivestreamHomepageComponent;
  let fixture: ComponentFixture<LivestreamHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivestreamHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivestreamHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
