import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private localStorageKey = 'todos';

  constructor(private http: HttpClient) { }

  // Obtener todos los todos
  getTodos(): Observable<Todo[]> {
    const storedTodos = this.getFromLocalStorage();
    
    if (storedTodos && storedTodos.length > 0) {
      return of(storedTodos);
    } else {
      return this.http.get<Todo[]>(`${this.apiUrl}?_limit=10`).pipe(
        tap(todos => this.saveToLocalStorage(todos))
      );
    }
  }

  // Obtener un todo específico
  getTodo(id: number): Observable<Todo> {
    const storedTodos = this.getFromLocalStorage();
    const storedTodo = storedTodos.find(todo => todo.id === id);
    
    if (storedTodo) {
      return of(storedTodo);
    } else {
      return this.http.get<Todo>(`${this.apiUrl}/${id}`);
    }
  }

  // Agregar un nuevo todo
  addTodo(todo: Todo): Observable<Todo> {
    const storedTodos = this.getFromLocalStorage();
    const maxId = storedTodos.length > 0 ? Math.max(...storedTodos.map(t => t.id)) : 0;
    const newTodo = { ...todo, id: maxId + 1 };
    
    storedTodos.push(newTodo);
    this.saveToLocalStorage(storedTodos);
    
    return of(newTodo);
  }

  // Actualizar un todo existente
  updateTodo(todo: Todo): Observable<Todo> {
    const storedTodos = this.getFromLocalStorage();
    const index = storedTodos.findIndex(t => t.id === todo.id);
    
    if (index !== -1) {
      storedTodos[index] = todo;
      this.saveToLocalStorage(storedTodos);
      return of(todo);
    } else {
      throw new Error('Todo not found');
    }
  }

  // Eliminar un todo
  deleteTodo(id: number): Observable<void> {
    const storedTodos = this.getFromLocalStorage();
    const filteredTodos = storedTodos.filter(todo => todo.id !== id);
    this.saveToLocalStorage(filteredTodos);
    return of(void 0);
  }

  // Métodos para manejar localStorage
  private getFromLocalStorage(): Todo[] {
    const todosString = localStorage.getItem(this.localStorageKey);
    return todosString ? JSON.parse(todosString) : [];
  }

  private saveToLocalStorage(todos: Todo[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  // Resetear los datos
  resetTodos(): Observable<Todo[]> {
    localStorage.removeItem(this.localStorageKey);
    return this.http.get<Todo[]>(`${this.apiUrl}?_limit=10`).pipe(
      tap(todos => this.saveToLocalStorage(todos))
    );
  }
}