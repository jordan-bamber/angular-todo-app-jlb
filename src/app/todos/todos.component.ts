import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { todo } from '../shared/todo.model';
import {TodosStoreService} from '../shared/todos-store.service'
import { ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todoArray: todo[] = [];
  showValidationErrors: boolean = false;
  
  //constructor(private dataService: DataService, private dialog: MatDialog) { }
  constructor(public todosStore: TodosStoreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoArray = this.todosStore.getAllTodos();
  }

  //Why in this file?
  //Add Todo
  onFormSubmit(form: NgForm) {

    if(form.invalid) return this.showValidationErrors = true;

    this.todosStore.addTodo(form.value.text);

    this.showValidationErrors = false;
    form.reset();

    //added this so always returns. Good idea?
    return '';
  }

  toggleCompleted(todo: todo) {
    todo.completed = !todo.completed
  }

  editTodo(todo: todo) {

    //alert('Under construction')
    
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


