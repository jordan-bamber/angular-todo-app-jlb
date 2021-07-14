import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { todo } from '../shared/todo.model';
import {TodosStoreService} from '../shared/todos-store.service'
import { ChangeDetectionStrategy, ElementRef } from '@angular/core';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todoArray: todo[] = [];
  showValidationErrors: boolean = false;
  
  constructor(public todosStore: TodosStoreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoArray = this.todosStore.getAllTodos();
  }

  onFormSubmit(form: NgForm) {

    if(form.invalid) return this.showValidationErrors = true;

    //trim whitespace from both ends
    this.todosStore.addTodo(form.value.text.trim());
    //this.todosStore.addTodo(form.value.text);

    this.showValidationErrors = false;
    form.reset();

    return '';
  }

  toggleCompleted(todo: todo) {
    todo.completed = !todo.completed
    this.todosStore.toggleCompleted(todo.id, todo.completed);
  }

  editTodo(todo: todo) {

    const index = this.todoArray.indexOf(todo);

    //Angular MatDialog https://material.angular.io/components/dialog/overview
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        
        console.log('result: ', result)
        this.todosStore.updateTodo(todo.id, result.text);
      }
    });
  } 

  deleteTodo(todo: todo) {
    const index = this.todoArray.indexOf(todo);
    this.todosStore.deleteTodo(todo.id);
  }


}


