import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationItemComponent } from './specialization-item.component';

describe('SpecializationItemComponent', () => {
  let component: SpecializationItemComponent;
  let fixture: ComponentFixture<SpecializationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
