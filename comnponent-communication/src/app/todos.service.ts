import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private statusSubject$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(this.apiUrl);
  }

  changeStatus(status: any) {
    this.statusSubject$.next(status);
  }
}
