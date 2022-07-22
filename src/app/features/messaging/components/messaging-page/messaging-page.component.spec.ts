import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingPageComponent } from './messaging-page.component';

describe('MessagingPageComponent', () => {
  let component: MessagingPageComponent;
  let fixture: ComponentFixture<MessagingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
