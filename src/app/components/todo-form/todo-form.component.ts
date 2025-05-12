import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  isEditMode = false;
  todoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.todoId = +id;
        this.loadTodo(this.todoId);
      }
    });
  }

  initForm(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      completed: [false]
    });
  }

  loadTodo(id: number): void {
    this.todoService.getTodo(id).subscribe({
      next: (todo) => {
        this.todoForm.patchValue({
          title: todo.title,
          completed: todo.completed
        });
      },
      error: (error) => {
        console.error('Error loading todo', error);
        this.snackBar.open('Error al cargar la tarea', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['/todos']);
      }
    });
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const todoData: Todo = {
      id: this.isEditMode && this.todoId ? this.todoId : 0,
      title: this.todoForm.value.title,
      completed: this.todoForm.value.completed,
      userId: 1
    };

    if (this.isEditMode && this.todoId) {
      this.todoService.updateTodo(todoData).subscribe({
        next: () => {
          this.snackBar.open('Tarea actualizada con éxito', 'Cerrar', {
            duration: 2000
          });
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Error updating todo', error);
          this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
            duration: 3000
          });
        }
      });
    } else {
      this.todoService.addTodo(todoData).subscribe({
        next: () => {
          this.snackBar.open('Tarea creada con éxito', 'Cerrar', {
            duration: 2000
          });
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Error creating todo', error);
          this.snackBar.open('Error al crear la tarea', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}