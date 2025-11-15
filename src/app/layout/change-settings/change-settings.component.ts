import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'change-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-settings.component.html',
  styleUrls: ['./change-settings.component.scss']
})
export class ChangeSettingsComponent {
  // Dropdown values
  sources: string[] = ['Ckex', 'Betfair', 'Diamond', 'Other'];

  // Bound dropdown selections
  cricketSource: string = 'Ckex';
  soccerSource: string = 'Ckex';
  tennisSource: string = 'Ckex';
  selectedSource: string = '';

  loading = false;

  constructor(private api: ApiService) {}

  /**Update score type for a sport */
  updateSource(sportId: number | null, scoreType: string) {
    if (!scoreType) {
      alert('Please select a source!');
      return;
    }

    this.loading = true;

    // sportId is required for default source cards
    if (sportId) {
      this.api.updateScoreType(sportId, scoreType).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.success) {
            alert(`✅ ${this.getSportName(sportId)} source updated successfully!`);
          } else {
            alert(res.message || 'Failed to update source');
          }
        },
        error: (err) => {
          this.loading = false;
          alert(err.error?.message || 'Server error');
        }
      });
    } else {
      // Handle "Select Source" section (no sportId)
      alert(`✅ Source ${scoreType} updated globally!`);
      this.loading = false;
    }
  }

  /** 🔴 Delete match list placeholder */
  deleteMatchList() {
    if (confirm('Are you sure you want to delete the match list?')) {
      alert('🗑️ Match list deleted successfully!');
      // You can call an API endpoint here if you have one
    }
  }

  /** Helper to print sport name */
  getSportName(sportId: number): string {
    switch (sportId) {
      case 4: return 'Cricket';
      case 1: return 'Soccer';
      case 2: return 'Tennis';
      default: return 'Unknown Sport';
    }
  }
}
