import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";

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

  sources: string[] = ["Ckex", "Leon Bet", "SS8", "ourRadar", "Fasthik","Diamond"];

  matches: any[] = [];
  filteredMatches: any[] = [];

  selectedTab: string = "cricket"; // UI tab highlight
  selectedSportId: number = 4; // Cricket = 4

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
        this.applyFilter();
        // this.toastr.success("Matches loaded successfully!");
      },
      error: () => this.toastr.error("Failed to load matches"),
    });
  }

  changeTab(tabName: string, sportId: number) {
    this.selectedTab = tabName;
    this.selectedSportId = sportId;
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredMatches = this.matches.filter(
      (x) => x.sportId === this.selectedSportId
    );

    this.totalPages = Math.ceil(this.filteredMatches.length / this.pageSize);
  }

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
      },
      error: () => this.toastr.error("Failed to update source"),
    });
  }

  updateScore(match: any) {
    const payload = {
      id: match._id,
      scoreId: match.scoreId,
    };

    this.api.updateMatchScores(payload).subscribe({
      next: () => this.toastr.success(`Score updated for ${match.eventName}`),
      error: () => this.toastr.error("Failed to update score"),
    });
  }

  toggleStatus(match: any) {
    const payload = { id: match._id, isActive: match.isActive };

    this.api.updateStatus(payload).subscribe({
      next: () => {
        this.toastr.success(
          `${match.eventName} is now ${match.isActive ? "ACTIVE" : "INACTIVE"}`
        ),
          this.loadAllSports();
      },
      error:(err:any)=>{

      }
    });
  }

  goToIframePage(match: any) {
    this.router.navigate(["/app/iframe", match.eventId]);
  }

  syncMachesLoading(){
    this.api.addSyncMatches({}).subscribe({
      next:(res:any)=>{
         this.loadAllSports()
         this.toastr.success("Matches Sync Successfully!")
      }
    })
  }
}
