import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-matches",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.scss"],
})
export class MatchesComponent implements OnInit {
  private api = inject(ApiService);
  private toastr = inject(ToastrService);

  sports = [
    { name: "Cricket", id: 4 },
    { name: "Soccer", id: 1 },
    { name: "Tennis", id: 2 },
  ];

  selectedSport: any = this.sports[0];
  matches: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadMatches(this.selectedSport);
  }

  // ✅ Load matches by sport
  loadMatches(sport: any) {
    this.loading = true;
    this.matches = [];
    const payload = { sportId: sport.id };

    this.api.getMatchesBySportsId(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.matches?.length) {
          this.matches = res.matches.map((m: any) => ({
            ...m,
            url: m.tvUrl || "", // pre-fill if existing
          }));
          this.toastr.success(`${sport.name} matches loaded successfully!`);
        } else {
          this.toastr.warning(`No matches found for ${sport.name}.`);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.toastr.error("Failed to load matches");
      },
    });
  }

  filterMatches(sportName: string) {
    const selected = this.sports.find((s) => s.name === sportName);
    if (selected) {
      this.selectedSport = selected;
      this.loadMatches(selected);
    }
  }

  // ✅ Save TV URL for match
  setUrl(match: any) {
    if (!match.url) {
      this.toastr.warning("Please enter a TV URL first.");
      return;
    }

    const payload = {
      eventId: match.eventId,
      tvUrl: match.url,
    };

    // this.api.setTvUrl(payload).subscribe({
    //   next: (res) => {
    //     this.toastr.success(`TV URL set for ${match.eventName}`);
    //     match.tvUrl = match.url; // update displayed link
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("Failed to set TV URL");
    //   },
    // });
  }

  fetchTvUrl(match: any) {
    this.toastr.info(`Fetching TV URL for ${match.eventName}`);
    // this.api.fetchTvUrl({ eventId: match.eventId }).subscribe({
    //   next: (res) => {
    //     match.tvUrl = res.tvUrl;
    //     match.url = res.tvUrl;
    //     this.toastr.success(`TV URL fetched for ${match.eventName}`);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("Failed to fetch TV URL");
    //   },
    // });
  }

  checkTv(match: any) {
    this.toastr.info(`Checking TV for ${match.eventName}`);
    // this.api.checkTv({ eventId: match.eventId }).subscribe({
    //   next: (res) => {
    //     this.toastr.success(res.message || "TV check successful!");
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("Failed to check TV");
    //   },
    // });
  }

  checkTv2(match: any) {
    this.toastr.info(`Checking TV2 for ${match.eventName}`);
    // this.api.checkTv2({ eventId: match.eventId }).subscribe({
    //   next: (res) => {
    //     this.toastr.success(res.message || "TV2 check successful!");
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.toastr.error("Failed to check TV2");
    //   },
    // });
  }

  getTabClass(index: number): string {
    const colors = [
      "bg-primary",
      "bg-success",
      "bg-warning",
      "bg-danger",
      "bg-info",
    ];
    return colors[index % colors.length];
  }

  get filteredMatches() {
    return this.matches;
  }
}
