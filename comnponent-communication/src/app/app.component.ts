import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosService } from './todos.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { TodosStatusComponent } from './todos-status/todos-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpperCasePipe, TodosStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'comnponent-communication';
  todosList: any[] = [];
  tableHeaders: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  selectedStatus: string = '';
  constructor(private todos: TodosService) {}

  ngOnInit(): void {
    this.todos.getTodos().subscribe((res: any) => {
      this.todosList = res;
      this.tableHeaders = this.getTableHeaders(this.todosList);
      this.paginatedData = this.todosList
      .slice(0, 10);
    });

    this.todos.currentStatus.subscribe((res) => {
      console.log("subject", res)
      this.selectedStatus = res;
    })
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
      this.paginatedData = this.todosList
      .filter((item) => item.completed.toString() === this.selectedStatus.toLowerCase())
      .slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
      console.log('prev', this.paginatedData);
    }
  }

  nextPage() {
    console.log('length', this.todosList.length / 10);
    if (this.currentPage < this.todosList.length / 10) {
      this.currentPage++;
      this.paginatedData = this.todosList
      .filter((item) => item.completed.toString() === this.selectedStatus.toLowerCase())
      .slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
      console.log('next', this.paginatedData);
    }
  }

  onStatusFilter(event: any) {
    this.selectedStatus = event;
    console.log("typeof",typeof this.selectedStatus)
    if (this.selectedStatus === 'True' || this.selectedStatus === 'False') {
      this.paginatedData = this.todosList
        .filter((item) => item.completed.toString() === this.selectedStatus.toLowerCase())
        .slice(0,10)
        console.log("paginated data", this.paginatedData)
    } else {
      this.paginatedData = this.todosList.slice(0, 10);
    }
  }
}
