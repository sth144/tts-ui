import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncTargetComponent } from './sync-target.component';

describe('SyncTargetComponent', () => {
  let component: SyncTargetComponent;
  let fixture: ComponentFixture<SyncTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
