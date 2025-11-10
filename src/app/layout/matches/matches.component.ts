import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule, FormsModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  displayedColumns = ['sno','name','teams','active'];
  data = [
    { id:1, name:'Match 1', teams:'A vs B', active:true },
    { id:2, name:'Match 2', teams:'C vs D', active:false }
  ];
}
