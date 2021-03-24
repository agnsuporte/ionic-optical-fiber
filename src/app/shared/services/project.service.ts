import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Project } from '../interfaces/project';
import { config } from 'src/app/shared/config';
import { UtilService } from 'src/app/shared/services/util.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  private baseUrl = `${config.apiUrl}/project`;

  constructor(private http: HttpClient, private util: UtilService) {}

  read(offset: number = 0, limit: number = 10): Observable<Project[]> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`
    return this.http.get<Project[]>(url).pipe(
      map((data) => data),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Project> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((obj) => obj.data),
      catchError((e) => this.errorHandler(e))
    );
  }

  // create(project: Project): Observable<Project> {
  //   const data = {
  //     projectName: project.projectName,
  //     projectCompany: project.projectCompany,
  //   };

  //   return this.http.post<Project>(`${this.baseUrl}/create`, data).pipe(
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   );
  // }

  // update(project: Project): Observable<Project> {
  //   const url = `${this.baseUrl}/update/${project.id}`;

  //   const data = {
  //     projectName: project.projectName,
  //     projectCompany: project.projectCompany,
  //   };

  //   return this.http.put<Project>(url, data).pipe(
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   );
  // }

  // delete(id: number): Observable<Project> {
  //   const url = `${this.baseUrl}/delete/${id}`;

  //   return this.http.delete<Project>(url).pipe(
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   );
  // }

  errorHandler(e: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Ocorreu um error!';

    if (e.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${e.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Code: ${e.status} Message: ${e.message}`;
      if (e.error.token) {
        errorMessage = 'Para continuar, é necessário fazer login.';
      }
    }

    this.util.showMessage(
      {
        message: errorMessage, 
        color:"danger", 
        position:"top", 
        duration: 3000
      }
    );
    return throwError(e.error);
  }



}
