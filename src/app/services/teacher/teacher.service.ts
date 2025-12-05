import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Teacher, TeacherFormData } from '../../models';

/**
 * Service for managing teacher data operations.
 * Handles fetching, adding, and error handling for teacher records from the JSON server.
 */
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  /** Base URL for the teachers API endpoint */
  private readonly apiUrl = 'http://localhost:5000/teachers';

  /** Observable stream of all teachers, fetched on service initialization */
  public readonly teachers$: Observable<Teacher[]>;

  /**
   * Initializes the TeacherService and fetches the teacher list.
   * @param http - Angular HttpClient for making HTTP requests
   */
  constructor(private readonly http: HttpClient) {
    this.teachers$ = this.http.get<Teacher[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error);
        return of([]);
      })
    );
  }

  /**
   * Adds a new teacher to the database.
   * Automatically generates a unique ID for the teacher.
   * @param teacherData - Teacher information without ID
   * @returns Observable of the created teacher with generated ID
   * @throws Error if the HTTP request fails
   */
  public addTeacher(teacherData: TeacherFormData): Observable<Teacher> {
    const newTeacher: Teacher = {
      ...teacherData,
      id: this.generateTeacherId(),
    };

    return this.http.post<Teacher>(this.apiUrl, newTeacher).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding teacher:', error);
        throw error;
      })
    );
  }

  /**
   * Generates a unique teacher ID.
   * Uses current timestamp and random number to ensure uniqueness.
   * @returns Generated teacher ID in format 'teach{timestamp}{random}'
   */
  private generateTeacherId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `teach${timestamp}${random}`;
  }
}
