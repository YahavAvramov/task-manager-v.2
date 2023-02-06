import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksShowComponent } from './tasks-show.component';

describe('TasksShowComponent', () => {
  let component: TasksShowComponent;
  let fixture: ComponentFixture<TasksShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
