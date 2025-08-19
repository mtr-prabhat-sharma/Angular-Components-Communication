import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosService } from './todos.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'comnponent-communication';

  constructor(private todos: TodosService) {}

  ngOnInit(): void {
    this.todos.getTodos().subscribe((res) => {
      console.log("res", res)
    })
  }
  
}
