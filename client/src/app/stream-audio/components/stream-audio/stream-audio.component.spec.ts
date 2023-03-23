import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamAudioComponent } from './stream-audio.component';

describe('StreamAudioComponent', () => {
  let component: StreamAudioComponent;
  let fixture: ComponentFixture<StreamAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
