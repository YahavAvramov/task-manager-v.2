import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNewTaskComponent } from './make-new-task.component';

describe('MakeNewTaskComponent', () => {
  let component: MakeNewTaskComponent;
  let fixture: ComponentFixture<MakeNewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeNewTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
