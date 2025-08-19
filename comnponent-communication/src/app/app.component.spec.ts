import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { TodosService } from './todos.service';

class MockTodosService {
  getTodos() {
    return of([
      { id: 1, title: 'Todo 1', completed: true },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: true },
    ]);
  }
  currentStatus = of('All');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todosService: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TodosService, useClass: MockTodosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges(); // triggers ngOnInit

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'comnponent-communication'`, () => {
    expect(component.title).toEqual('comnponent-communication');
  });

  it('should render title in H1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TODOS PLAIN HTML TABLE');
  });

    it('should load todos from service on init', fakeAsync(() => {
    tick(); // simulate async
    expect(component.todosList.length).toBeGreaterThan(0);
    expect(component.paginatedData.length).toBe(component.todosList.length); // capped at 10
  }));

  it('should return table headers correctly', () => {
    const headers = component.getTableHeaders(component.todosList);
    expect(headers).toContain('id');
    expect(headers).toContain('title');
    expect(headers).toContain('completed');
  });

    it('should filter data when onStatusFilter is called with "True"', () => {
    component.onStatusFilter('True');
    expect(component.paginatedData.every(todo => todo.completed === true)).toBeTrue();
  });

   it('should filter data when onStatusFilter is called with "False"', () => {
    component.onStatusFilter('False');
    expect(component.paginatedData.every(todo => todo.completed === false)).toBeTrue();
  });
});
