import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAudioComponent } from './download-audio.component';

describe('DownloadAudioComponent', () => {
  let component: DownloadAudioComponent;
  let fixture: ComponentFixture<DownloadAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
