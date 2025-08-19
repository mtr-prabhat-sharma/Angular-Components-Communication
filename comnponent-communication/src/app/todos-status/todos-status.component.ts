import { Component, EventEmitter, Output } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-status',
  standalone: true,
  imports: [],
  templateUrl: './todos-status.component.html',
  styleUrl: './todos-status.component.css'
})
export class TodosStatusComponent {
  constructor(private todos: TodosService) {}
  @Output() statusChanged = new EventEmitter<string>();
  todosStatus: string[] = ['All', 'True', 'False'];

  onStatusChange(event: any) {
    const value = event.target.value;
    this.statusChanged.emit(value);
    this.todos.changeStatus(value);
  }
}
