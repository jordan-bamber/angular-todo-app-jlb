import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todoArray: todo[] = [];
  showValidationErrors: boolean = false;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todoArray = this.dataService.getAllTodos();
  }

  //Why in this file?
  onFormSubmit(form: NgForm) {

    if(form.invalid) return this.showValidationErrors = true;

    this.dataService.addTodo(new todo(form.value.text));

    this.showValidationErrors = false;
    form.reset();

    //added this so always returns. Good idea?
    return;
  }

}
