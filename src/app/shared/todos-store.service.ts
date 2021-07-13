import { Injectable } from '@angular/core';
import { todo } from './todo.model';
import {BehaviorSubject} from 'rxjs';
import {shareReplay, map} from 'rxjs/operators';
import { uuid } from './uuid';
import { LocalStorageRefService } from "./local-storage-ref.service";

@Injectable({providedIn: 'root'})
export class TodosStoreService {
  private _localStorage: Storage;

  private readonly _todos = new BehaviorSubject<todo[]>([]);
  

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly todos$ = this._todos.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
  }

  setInfo(data: todo[]): void {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem("myData", jsonData);
    //this.todos$.next(data);
  }

  // loadInfo(): void {
  //   const data = JSON.parse(this._localStorage.getItem("myData"));
  //   this.todos$.next(data);
  // }

  loadInfo(): any {
      const data = JSON.parse(this._localStorage.getItem("myData"));
      console.log('parsed data: ', data)
      return data;
    }

  clearInfo() {
    this._localStorage.removeItem("myData");
    //this.todos$.next(null);
  }

  clearAllLocalStorage(): void {
    this._localStorage.clear();
    //this.todos$.next(null);
  }

   getAllTodos() {
    this.todos = this.loadInfo();
    return this.todos;
  }

  readonly allTodos$ = this.todos$

  // // we'll compose the todos$ observable with map operator to create a stream of only completed todos
  // readonly completedTodos$ = this.todos$.pipe(
  //   map(todos => todos.filter(todo => todo.completed))
  // )

  // the getter will return the last value emitted in _todos subject
  get todos(): todo[] {
    return this._todos.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  private set todos(val: todo[]) {
    this._todos.next(val);
  }

  addTodo(text: string) {
    // we assign a new copy of todos by adding a new todo to it 
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.todos = [
      ...this.todos, 
      { text, completed: false, id: uuid()}
    ];
    
    this.setInfo(this.todos);
  }

  updateTodo(id: number, text: string) {
    console.log(this.todos, id)
    
    let todo = this.todos.find(todo => todo.id === id);

    if(todo) {
      // we need to make a new copy of todos array, and the todo as well
      // remember, our state must always remain immutable
      // otherwise, on push change detection won't work, and won't update its view
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        text
      }
      this.todos = [...this.todos];
      this.setInfo(this.todos);
    }
  }

  deleteTodo(id: number) {
    console.log(this.todos, id)
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.setInfo(this.todos);
  }

  toggleCompleted(id: number, completed: boolean) {
    let todo = this.todos.find(todo => todo.id === id);

    if(todo) {
      // we need to make a new copy of todos array, and the todo as well
      // remember, our state must always remain immutable
      // otherwise, on push change detection won't work, and won't update its view
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        completed
      }
      this.todos = [...this.todos];
      this.setInfo(this.todos);
    }
  }


}
