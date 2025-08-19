import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosService } from './todos.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'comnponent-communication';
  todosList: any[] = [];
  tableHeaders: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  constructor(private todos: TodosService) {}

  ngOnInit(): void {
    this.todos.getTodos().subscribe((res: any) => {
      console.log('todos', res);
      this.todosList = res;
      this.tableHeaders = this.getTableHeaders(this.todosList);
      this.paginatedData = this.todosList.slice(0, 20);
      console.log(this.tableHeaders);
    });
  }

  getTableHeaders(data: any): string[] {
    const keySet = new Set<string>();
    data.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        keySet.add(key);
      });
    });
    return [...keySet];
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedData = this.todosList.slice(
        (this.currentPage - 1) * 20,
        this.currentPage * 20
      );
      console.log('prev', this.paginatedData);
    }
  }

  nextPage() {
    console.log('length', this.todosList.length / 20);
    if (this.currentPage < this.todosList.length / 20) {
      this.currentPage++;
      this.paginatedData = this.todosList.slice(
        (this.currentPage - 1) * 20,
        this.currentPage * 20
      );
      console.log('next', this.paginatedData);
    }
  }
}
