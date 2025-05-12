import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading todos', error);
        this.snackBar.open('Error al cargar las tareas', 'Cerrar', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  toggleComplete(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        this.snackBar.open('Tarea actualizada', 'Cerrar', {
          duration: 2000
        });
        // Actualizar la lista local para reflejar el cambio
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => {
        console.error('Error updating todo', error);
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  deleteTodo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.snackBar.open('Tarea eliminada con éxito', 'Cerrar', {
            duration: 2000
          });
        },
        error: (error) => {
          console.error('Error deleting todo', error);
          this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}