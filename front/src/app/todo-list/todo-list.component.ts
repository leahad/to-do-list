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
    // send to do to update to the back
    this.toDoService.toDoToUpdate(toDo).subscribe(response => {
      console.log('Data sent with success', response);
    })
  }

  getNewToDo(event: ToDo): void {
    this.toDoList.push(event);
  }

  delete(toDo: any) {
    // send to do to delete from dbb to the back
    this.toDoService.DeleteToDo(toDo).subscribe(response => {
      console.log('toDo deleted with success', response);
    })
    // remove to do from the to do list on the front side
    let toDoIndex = this.toDoList.indexOf(toDo);
    this.toDoList.splice(toDoIndex,1);
  }

}
