import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  resetData(): void {
    this.todoService.resetTodos().subscribe(() => {
      this.snackBar.open('Datos restablecidos con éxito', 'Cerrar', {
        duration: 3000
      });
    });
  }
}