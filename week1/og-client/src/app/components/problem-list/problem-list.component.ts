import {Component, Inject, OnInit} from '@angular/core';
import {Problem} from '../../models/problem.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  subscriptionProblems: Subscription;
  constructor(@Inject('data') private dataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems(): void {
    this.dataService.getProblems()
      .then(problems => this.problems = problems);
  }

}
