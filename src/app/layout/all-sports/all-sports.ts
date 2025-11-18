import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../../services/api.service";
import { Router, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: "all-sports",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./all-sports.html",
  styleUrls: ["./all-sports.css"],
})
export class AllSports implements OnInit {
  private api = inject(ApiService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  selectedSport: string = "";
  sources: string[] = ["Ckex", "Leon Bet", "SS8", "ourRadar", "Fasthik"];
  matches: any[] = [];

  // ✅ Pagination variables
  currentPage = 1;
  pageSize = 100;
  totalPages = 1;

  ngOnInit(): void {
    this.loadAllSports();
  }

  loadAllSports() {
    this.api.allSports({}).subscribe({
      next: (res: any) => {
        this.matches = res?.data || [];
        this.totalPages = Math.ceil(this.matches.length / this.pageSize);
        this.toastr.success("Sports loaded successfully!");
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to load sports");
      },
    });
  }

  // ✅ Pagination handlers
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  updateSource(match: any) {
    const payload = { id: match._id, scoreType: match.scoreType };
    this.api.updateMatchScores(payload).subscribe({
      next: () => {
        this.toastr.success(`Source updated for ${match.eventName}`);
        this.loadAllSports();
        match.scoreType = match.source;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to update source");
      },
    });
  }

  updateScore(match: any) {
    const payload = {
      id: match._id,
      scoreId1: match.scoreId1,
      scoreId2: match.scoreId2,
    };
    this.api.updateMatchScores(payload).subscribe({
      next: () => this.toastr.success(`Score updated for ${match.eventName}`),
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to update score");
      },
    });
  }

  fetchScore(match: any) {
    // Uncomment when backend ready
  }

  toggleStatus(match: any) {
    const payload = { id: match._id, isActive: match.isActive };
    this.api.updateStatus(payload).subscribe({
      next: () => {
        this.toastr.success(
          `${match.eventName} marked as ${
            match.isActive ? "Active" : "Inactive"
          }`
        );
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to update status");
      },
    });
  }

  goToIframePage(match: any) {
    this.router.navigate(["/app/iframe", match.eventId], {
    });
  }
}
