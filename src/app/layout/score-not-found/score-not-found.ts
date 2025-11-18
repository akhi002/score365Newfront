import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'score-not-found',
  imports: [],
  templateUrl: './score-not-found.html',
  styleUrl: './score-not-found.css',
})
export class ScoreNotFound {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/app/all-sports']); // change route as needed
  }
}
