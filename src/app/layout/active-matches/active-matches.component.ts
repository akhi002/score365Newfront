import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-active-matches",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./active-matches.component.html",
  styleUrls: ["./active-matches.component.scss"],
})
export class ActiveMatchesComponent implements OnInit {
  matches: any[] = [];
  groupedMatches: { [sport: string]: any[] } = {};
  groupedMatchesKeys: string[] = [];

  selectedSport: string = "Cricket";

  loading = false;
  errorMessage = "";
  updatingMatchId: string | null = null;

  // 🔹 Pagination
  pageSize = 10;
  currentPage: { [sport: string]: number } = {
    Cricket: 1,
    Tennis: 1,
    Soccer: 1
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchAllMatches();
  }

  /* Fetch ALL matches (Active + Inactive) */
  fetchAllMatches() {
    this.loading = true;

    this.api.getAllMatches({}).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.status === "success" && Array.isArray(res.data)) {
          this.matches = res.allMatches;
          this.groupMatchesBySport();
        } else {
          this.errorMessage = res.message || "No matches found";
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || "Server error";
      },
    });
  }

  /* Group matches by sports */
  groupMatchesBySport() {
    this.groupedMatches = {
      Cricket: [],
      Tennis: [],
      Soccer: [],
    };

    this.matches.forEach((match) => {
      switch (match.sportId) {
        case 4:
          this.groupedMatches.Cricket.push(match);
          break;
        case 2:
          this.groupedMatches.Tennis.push(match);
          break;
        case 1:
          this.groupedMatches.Soccer.push(match);
          break;
      }
    });
  }

  /* Pagination Logic */
  getPaginatedMatches(sport: string) {
    const start = (this.currentPage[sport] - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.groupedMatches[sport].slice(start, end);
  }

  getTotalPages(sport: string): number {
    return Math.ceil(this.groupedMatches[sport].length / this.pageSize) || 1;
  }

  changePage(sport: string, direction: number) {
    const totalPages = this.getTotalPages(sport);
    this.currentPage[sport] += direction;

    if (this.currentPage[sport] < 1) this.currentPage[sport] = 1;
    if (this.currentPage[sport] > totalPages) this.currentPage[sport] = totalPages;
  }

  /* Switch Tabs */
  selectSport(sport: string) {
    this.selectedSport = sport;
  }

  /* Toggle Status */
  toggleMatchStatus(match: any) {
    const newStatus = !match.isActive;
    this.updatingMatchId = match._id;

    this.api.changeMatchStatus(match._id, newStatus).subscribe({
      next: (res: any) => {
        this.updatingMatchId = null;

        if (res.status === "success") {
          this.fetchAllMatches();
        } else {
          alert(res.message || "Failed to update status");
        }
      },
      error: (err) => {
        this.updatingMatchId = null;
        alert(err.error?.message || "Server error");
      },
    });
  }
}
