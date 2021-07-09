import { Injectable } from '@angular/core';
import { todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todoArray: todo[] = [
    new todo('this is a test', true),
    new todo('John Q Testing big task for today: Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quis, cumque iusto quos eum alias reiciendis doloribus perferendis iste. Hic, tenetur nemo ea alias eos libero non expedita sed animi.')
  ];

  constructor() { }

  getAllTodos() {
    return this.todoArray;
  }

  addTodo(todo: todo) {
    this.todoArray.push(todo);
  }

  updateTodo(index: number, updatedTodo: todo) {
    this.todoArray[index] = updatedTodo;

  }

  deleteTodo(index: number) {
    this.todoArray.splice(index,1);

  }

}
