import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosStatusComponent } from './todos-status.component';
import { provideHttpClient } from '@angular/common/http';

describe('TodosStatusComponent', () => {
  let component: TodosStatusComponent;
  let fixture: ComponentFixture<TodosStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosStatusComponent],
       providers: [
        provideHttpClient(),

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
