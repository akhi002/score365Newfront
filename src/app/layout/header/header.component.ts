import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { DecodingService } from "../../services/decoding-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  userId: string | null = null;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private cookie: CookieService,
    private decode: DecodingService,
    private router:Router
  ) {}

  ngOnInit(): void {

    try {
      const cookieData = this.cookie.get("enc_uid");
      if (!cookieData) {
        console.warn("User cookie not found.");
        return;
      }
      const parsed = JSON.parse(cookieData);      
      this.userId = this.decode.decrypt(parsed.encryptedData, parsed.iv);
    } catch (error) {
      this.toastr.error("Failed to read user info.");
    }
  }

  logout() {
    this.api.logOut({userId:this.userId}).subscribe({
      next: () => {
        this.toastr.success("Logout Successfully!");
        this.cookie.delete("enc_uid", '/');
        this.router.navigateByUrl("/login")
      },
      error: () => {
        this.toastr.error("Logout failed!");
      }
    });
  }
}
