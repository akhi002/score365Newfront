import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-white-listing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
  ],
  templateUrl: './whitelisting.html',
  styleUrls: ['./whitelisting.css'],
})
export class Whitelisting implements OnInit {
  private api = inject(ApiService);
  private toastr = inject(ToastrService);

  newWebsite = { websiteName: '', domain: '' };
  websites: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadWhitelistedSites();
  }

  // ✅ Load all whitelisted websites
  loadWhitelistedSites() {
    this.loading = true;
    this.api.getAllWebsites({}).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.websites = res?.data || [];
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Failed to load whitelist');
      },
    });
  }

  // ✅ Add Website (Payload format)
  addWebsite() {
    if (!this.newWebsite.websiteName || !this.newWebsite.domain) {
      this.toastr.warning('Please fill both fields');
      return;
    }

    const payload = {
      websiteName: this.newWebsite.websiteName,
      domain: this.newWebsite.domain,
    };

    this.loading = true;
    this.api.addWebsite(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Website added successfully!');
        this.newWebsite = { websiteName: '', domain: '' };
        this.loadWhitelistedSites();
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Failed to add website');
      },
    });
  }

  // ✅ Update Website (domain only)
  updateWebsite(site: any) {
    const payload = {
      id: site._id || site.id,
      domain: site.domain,
    };

    this.api.updateWebsite(payload).subscribe({
      next: () => {
        this.toastr.success('Website updated successfully!');
        this.loadWhitelistedSites();
      },
      error: (err) => {
        this.toastr.error('Failed to update website');
      },
    });
  }

  // ✅ Delete Website (by id)
  deleteWebsite(site: any) {
    // if (!confirm(`Delete ${site.websiteName}?`)) return;

    const payload = { id: site._id || site.id };

    this.api.deleteWebsite(payload).subscribe({
      next: () => {
        this.toastr.success('Website deleted successfully!');
        this.websites = this.websites.filter((w) => w._id !== site._id);
      },
      error: (err) => {
        this.toastr.error('Failed to delete website');
      },
    });
  }

  refreshList() {
    this.loadWhitelistedSites();
  }
}
