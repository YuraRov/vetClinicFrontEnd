import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPreviewComponent } from './chat-preview.component';

describe('ChatPreviewComponent', () => {
  let component: ChatPreviewComponent;
  let fixture: ComponentFixture<ChatPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
