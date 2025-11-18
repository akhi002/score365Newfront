import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "change-settings",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./change-settings.component.html",
  styleUrls: ["./change-settings.component.scss"],
})
export class ChangeSettingsComponent implements OnInit {

  private toastr = inject(ToastrService);

  // Default score sources
  sources: string[] = ["Ckex", "Betfair", "Diamond", "Leon Bet", "SS8", "Fasthik", "Other"];

  // Values to display in dropdowns
  cricketSource = "";
  soccerSource = "";
  tennisSource = "";

  selectedSource = "";

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadSettingsFromDB();   // <--- main function
  }

  /** Load ALL settings (Cricket, Soccer, Tennis) on page load */
  loadSettingsFromDB() {
    this.api.getAllSettings({}).subscribe({
      next: (res: any) => {
        if (!res.success || !res.data) return;

        res.data.forEach((item: any) => {
          const scoreType = item.scoreType;
          const sId = Number(item.sportId);

          // Add scoreTypes to dropdown list if not exists
          if (!this.sources.includes(scoreType)) {
            this.sources.push(scoreType);
          }

          // Map scoreType to correct sport
          if (sId === 4) this.cricketSource = scoreType;
          if (sId === 1) this.soccerSource = scoreType;
          if (sId === 2) this.tennisSource = scoreType;
        });
      },
      error: () => {
        this.toastr.error("Failed to load settings");
      }
    });
  }

  /** Update scoreType for any sport */
  updateSource(sportId: number | null, scoreType: string) {
    if (!scoreType) return this.toastr.error("Please select a source!");
    if (!sportId) return this.toastr.error("Please select a sport!");

    this.loading = true;

    const body = { sportId, scoreType };

    this.api.updateScoreTypeForSetting(body).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          this.toastr.success(res.message);
          this.loadSettingsFromDB(); // Reload updated values
        }
      },
      error: () => {
        this.loading = false;
        this.toastr.error("Failed to update source");
      }
    });
  }

  /* update all scoreType */
  updateAllScoreTypes(scoreType: string) {
  if (!scoreType) {
    return this.toastr.error("Please select a source!");
  }

  this.loading = true;

  this.api.updateAllScoreTypes({ scoreType }).subscribe({
    next: (res: any) => {
      this.loading = false;

      if (res.status) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error("Failed to update all matches");
      }
    },
    error: () => {
      this.loading = false;
      this.toastr.error("Server error updating all matches");
    }
  });
}

  /** Delete match list */
  deleteMatchList() {
    if (confirm("Are you sure you want to delete match list?")) {
      alert("Match list deleted successfully!");
    }
  }
}