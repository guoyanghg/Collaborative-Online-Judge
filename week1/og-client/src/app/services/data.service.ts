import { Injectable } from '@angular/core';
import {Problem} from '../models/problem.model';
import {PROBLEMS} from '../mock-problems';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private problemsSource = new BehaviorSubject<Promise<Problem[]>>(null);
  problems: Problem[] = PROBLEMS;
  constructor(private httpClient: HttpClient) { }

  getProblems(): Promise<Problem[]> {
      return this.httpClient.get('api/v1/problems')
       .toPromise().catch(this.handleError);
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get('api/v1/problems/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post('api/v1/problems', problem, {headers})
      .toPromise()
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<object> {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post('api/v1/build_and_run', data, {headers})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured!', error);
    return Promise.reject(error.body || error);
  }

}
