import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { DatePipe } from '@angular/common';
import { ToDo } from '../shared/model/todo.model';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {

  toDoForm = this.fb.group({
    item: ['',Validators.required],
    deadline: [new Date(),Validators.required],
  });

  @Output()
  toDoList: EventEmitter<ToDo> = new EventEmitter();

  constructor(private fb: FormBuilder, private toDoService: TodoService, private datePipe: DatePipe) {}

  onSubmit() {
    // get value from the form and create a new object ToDo
    const newToDo = new ToDo(
      this.toDoForm.value.item || '',
      this.toDoForm.value.deadline
    ? new Date(this.toDoForm.value.deadline)
    : new Date()
    );
    this.datePipe.transform(newToDo.deadline, 'yyyy-MM-dd');
    // send to do to save to the service
    this.toDoService.toDoToSave(newToDo).subscribe(response => {
      console.log('Data sent with success', response);
    })
    // send new to do to the todo-list component
    this.toDoList.emit(newToDo);

    this.toDoForm.reset();
  }
}
