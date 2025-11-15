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

  // Default dropdown values
  sources: string[] = ["Ckex", "Betfair", "Diamond", "Other"];

  cricketSource: string = "";
  soccerSource: string = "";
  tennisSource: string = "";
  selectedSource: string = "";

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCurrentSources();
  }

  /** 🔵 Load latest score type for all sports */
  loadCurrentSources() {
    this.fetchSource(4, "cricket");
    this.fetchSource(1, "soccer");
    this.fetchSource(2, "tennis");
  }

  /** 🔵 Fetch scoreType for a single sport */
  fetchSource(sportId: number, type: "cricket" | "soccer" | "tennis") {
    this.api.getScoreTypeBySportId({ sportId }).subscribe({
      next: (res: any) => {
        if (res.success) {

          const backendValue = res.scoreType;

          // ⭐ Add backend value to dropdown if missing
          if (backendValue && !this.sources.includes(backendValue)) {
            this.sources.push(backendValue);
          }

          // Assign received value
          if (type === "cricket") this.cricketSource = backendValue;
          if (type === "soccer") this.soccerSource = backendValue;
          if (type === "tennis") this.tennisSource = backendValue;
        }
      },
      error: () => {
        console.log(`Failed to load source for sport ${sportId}`);
      },
    });
  }

  /** 🟢 Update score type */
  updateSource(sportId: number | null, scoreType: string) {
    if (!scoreType) {
      this.toastr.error("Please select a source!");
      return;
    }

    this.loading = true;

    if (sportId) {
      let body = { sportId, scoreType };

      this.api.updateScoreTypeForSetting(body).subscribe({
        next: (res: any) => {
          this.loading = false;

          if (res.success) {
            this.toastr.success(`${this.getSportName(sportId)} source updated!`);

            // 🔄 Auto-refresh after update
            this.loadCurrentSources();
          }
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  /** 🗑️ Delete Match List */
  deleteMatchList() {
    if (confirm("Are you sure you want to delete match list?")) {
      alert("🗑️ Match list deleted successfully!");
    }
  }

  /** Helper */
  getSportName(sportId: number): string {
    switch (sportId) {
      case 4: return "Cricket";
      case 1: return "Soccer";
      case 2: return "Tennis";
      default: return "Unknown Sport";
    }
  }
}
