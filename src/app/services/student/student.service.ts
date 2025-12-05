import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Student, StudentFormData } from '../../models';

/**
 * Service for managing student data operations.
 * Handles fetching, adding, and error handling for student records from the JSON server.
 */
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /** Base URL for the students API endpoint */
  private readonly apiUrl = 'http://localhost:4000/students';

  /** Observable stream of all students, fetched on service initialization */
  public readonly students$: Observable<Student[]>;

  /**
   * Initializes the StudentService and fetches the student list.
   * @param http - Angular HttpClient for making HTTP requests
   */
  constructor(private readonly http: HttpClient) {
    this.students$ = this.http.get<Student[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching students:', error);
        return of([]);
      })
    );
  }

  /**
   * Adds a new student to the database.
   * Automatically generates a unique ID for the student.
   * @param studentData - Student information without ID
   * @returns Observable of the created student with generated ID
   * @throws Error if the HTTP request fails
   */
  public addStudent(studentData: StudentFormData): Observable<Student> {
    const newStudent: Student = {
      ...studentData,
      id: this.generateStudentId()
    };

    return this.http.post<Student>(this.apiUrl, newStudent).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding student:', error);
        throw error;
      })
    );
  }

  /**
   * Generates a unique student ID.
   * Uses current timestamp and random number to ensure uniqueness.
   * @returns Generated student ID in format 'stud{timestamp}{random}'
   */
  private generateStudentId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `stud${timestamp}${random}`;
  }
}
