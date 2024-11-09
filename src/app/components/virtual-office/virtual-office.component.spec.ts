import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualOfficeComponent } from './virtual-office.component';

describe('VirtualOfficeComponent', () => {
  let component: VirtualOfficeComponent;
  let fixture: ComponentFixture<VirtualOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirtualOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
