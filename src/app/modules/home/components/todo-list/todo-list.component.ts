import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]');

  ngDoCheck(): void {
    this.setLocalStrorage();
  }

  deleteItemTaskList(event: number): void {
    this.taskList.splice(event, 1);
  }

  deleteAll(): void {
    const confirm = window.confirm('Você deseja realmente Deletar tudo?');
    if (confirm) {
      this.taskList = [];
    }
  }

  setEmitTaskList(event: string): void {
    this.taskList.push({ task: event, checked: false });
  }

  validationInput(event: string, index: number): void {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja Deletar?');
      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  setLocalStrorage(): void {
    if (this.taskList) {
      this.taskList.sort(
        (fisrst, lasrt) => Number(fisrst.checked) - Number(lasrt.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
