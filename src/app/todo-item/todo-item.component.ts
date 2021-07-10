import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: todo = new todo('');
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onTodoClicked() {
    this.todoClicked.emit()
  }

  onEditClicked() {
    this.editClicked.emit()
  }

}
