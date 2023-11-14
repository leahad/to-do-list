import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {

  toDoForm = this.fb.group({
    item: ['',Validators.required],
    deadline: ['',Validators.required],
  });

  constructor(private fb: FormBuilder, private toDoService: TodoService, private datePipe: DatePipe) {}

  onSubmit() {
    // get value from the form
    const newToDo = this.toDoForm.value;
    newToDo.deadline = this.datePipe.transform(newToDo.deadline, 'yyyy-MM-dd');
    // send value to the service
    this.toDoService.toDoToSave(newToDo).subscribe(response => {
      console.log('Data sent with success', response);
    })

    this.toDoForm.reset();
  }

}
