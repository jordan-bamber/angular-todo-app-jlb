import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todoArray: todo[] = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todoArray = this.dataService.getAllTodos();
  }

}
