import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

   afterEach(() => {
    httpMock.verify(); // verify no outstanding http calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos()', () => {
    it('should fetch todos from API', () => {
      const mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true }
      ];

      service.getTodos().subscribe((todos: any) => {
        expect(todos.length).toBe(2);
        expect(todos).toEqual(mockTodos);
      });

      const req = httpMock.expectOne(service.apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });
  });

  describe('status BehaviorSubject', () => {
    it('should have default status as "All"', (done) => {
      service.currentStatus.subscribe(status => {
        expect(status).toBe('All');
        done();
      });
    });

    it('should update status when changeStatus is called', (done) => {
      const newStatus = 'True';

      // Subscribe first
      service.currentStatus.subscribe(status => {
        if (status === newStatus) {
          expect(status).toBe('True');
          done();
        }
      });

      // Trigger update
      service.changeStatus(newStatus);
    });
  });
});
