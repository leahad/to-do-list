import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getToDoList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/todolist");
  }

  toDoToSave(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/todo", data);
  }

  toDoToUpdate(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/todo/" + data.id, data);
  }

  DeleteToDo(data: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/todo/" + data.id, data);
  }

}
