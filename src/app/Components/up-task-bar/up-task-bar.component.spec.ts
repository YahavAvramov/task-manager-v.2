import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpTaskBarComponent } from './up-task-bar.component';

describe('UpTaskBarComponent', () => {
  let component: UpTaskBarComponent;
  let fixture: ComponentFixture<UpTaskBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpTaskBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpTaskBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
