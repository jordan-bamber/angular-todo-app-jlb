import { Injectable } from '@angular/core';
import { todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todoArray: todo[] = [
    new todo('this is a test todo item', true),
    new todo('Get buckets'),
    new todo('Robbie P big task for today: Buy a third bike. Preferrably >2500 cubic centimeter engine. Big enough seat to fit the whole family at once, it should be more of a family vehicle. Like the bike version of a minivan.')
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
