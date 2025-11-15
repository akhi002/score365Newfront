import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-active-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-matches.component.html',
  styleUrls: ['./active-matches.component.scss']
})
export class ActiveMatchesComponent implements OnInit {
  matches: any[] = [];
  groupedMatches: { [sport: string]: any[] } = {};
  groupedMatchesKeys: string[] = [];
  selectedSport: string = 'Cricket'; // Default tab
  loading = false;
  errorMessage = '';
  updatingMatchId: string | null = null; // spinner indicator

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchActiveMatches();
  }

  // 🔹 Fetch only active matches
  fetchActiveMatches() {
    this.loading = true;
    this.api.getAllActiveMatches().subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.status === 'success' && Array.isArray(res.data)) {
          // ✅ Keep only active matches
          this.matches = res.data.filter(m => m.isActive === true);
          this.groupMatchesBySport();
        } else {
          this.errorMessage = res.message || 'No matches found';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Server error';
      }
    });
  }

  // 🔹 Group matches by sport
  groupMatchesBySport() {
    this.groupedMatches = {};
    this.matches.forEach(match => {
      const sport = match.sportName || 'Unknown';
      if (!this.groupedMatches[sport]) this.groupedMatches[sport] = [];
      this.groupedMatches[sport].push(match);
    });

    this.groupedMatchesKeys = Object.keys(this.groupedMatches);

    // Default to Cricket tab
    if (this.groupedMatchesKeys.includes('Cricket')) {
      this.selectedSport = 'Cricket';
    } else if (this.groupedMatchesKeys.length > 0) {
      this.selectedSport = this.groupedMatchesKeys[0];
    }
  }

  // 🔹 Switch sport tab
  selectSport(sport: string) {
    this.selectedSport = sport;
  }

  // 🔹 Toggle match active/inactive and re-fetch list
  toggleMatchStatus(match: any) {
    const newStatus = !match.isActive;
    this.updatingMatchId = match._id; // show spinner

    this.api.changeMatchStatus(match._id, newStatus).subscribe({
      next: (res: any) => {
        this.updatingMatchId = null;
        if (res.status === 'success') {
          // ✅ Re-fetch matches to show only active ones
          this.fetchActiveMatches();
        } else {
          alert(res.message || 'Failed to update status');
        }
      },
      error: (err) => {
        this.updatingMatchId = null;
        alert(err.error?.message || 'Server error');
      }
    });
  }
}
