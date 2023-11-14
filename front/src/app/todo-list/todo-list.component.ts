import { Component, OnInit } from '@angular/core';
import { ToDo } from '../shared/model/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  toDoList!: any[];
  isCompleted!: Boolean;

  constructor(private toDoService: TodoService){ }

  ngOnInit(): void {
      this.toDoService.getToDoList().subscribe(data => {
        this.toDoList = data;
        this.isCompleted = data.isCompleted
      })
  }

  toggle(toDo: any) {
    toDo.isCompleted = !toDo.isCompleted;
    this.toDoService.toDoToUpdate(toDo).subscribe(response => {
      console.log('Data sent with success', response);
    })
  }

  delete(toDo: any) {
    this.toDoService.DeleteToDo(toDo).subscribe(response => {
      console.log('toDo deleted with success', response);
    })
  }

}
