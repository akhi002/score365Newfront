
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { SafeUrlPipe } from "../../layout/safe-url-pipe";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "iframe",
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: "./iframe.html",
  styleUrl: "./iframe.css",
})
export class Iframe {
  private api = inject(ApiService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  eventId: string | null = null;
  iframeUrl: any = null;
  matchList: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("eventId");

    if (this.eventId) {
      this.getMatchesByEventId();
    } else {
      this.router.navigate(["/app/score-not-found"]);
    }
  }

  getMatchesByEventId() {
    this.api.getMatchByEventId({ eventId: this.eventId }).subscribe({
      next: (res: any) => {
        this.matchList = res.data;

        if (!this.matchList) {
          return this.router.navigate(["/app/score-not-found"]);
        }

        const finalUrl = this.generateLmtUrl(
          this.matchList.scoreType,
          this.matchList.scoreId,
          this.matchList.gameId
        );

        if (!finalUrl || this.matchList.scoreId == "0") {
          return this.router.navigate(["/app/score-not-found"]);
        }

        //  window.open(finalUrl, "_blank");   (Remove this)
        //  window.location.href = finalUrl;

        //  Safe URL set for iframe
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);

        console.log("FINAL URL =>", finalUrl);
      },

      error: () => this.router.navigate(["/app/score-not-found"]),
    });
  }

  generateLmtUrl(sourceType: string, scoreId: number, gameId: number) {
    switch (sourceType) {
      case "Ckex":
        return `https://live.ckex.xyz/lmt/preview.html?matchId=${scoreId}`;

      case "Leon Bet": {
        const baseUrl =
          "https://ru.leonspwidget.com/iframe-widgets/dark/sportradarLiveMatchTracker";
        const family =
          gameId == 4 ? "Cricket" : gameId == 1 ? "Soccer" : "Tennis";

        return `${baseUrl}?matchId=${scoreId}&type=match.lmtPlus&lang=en&family=${family}`;
      }

      case "SS8":
        return `https://lmt.ss8055.com/index?Id=${scoreId}&t=d`;

      case "Fasthik":
        return `https://fasthit.uk/skyclnt/scoreboard-widget/?id=${scoreId}&t=b`;

      default:
        return "";
    }
  }
}



















// import { Component, inject } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// import { ApiService } from "../../services/api.service";
// import { SafeUrlPipe } from "../../layout/safe-url-pipe";
// import { DomSanitizer } from "@angular/platform-browser";

// @Component({
//   selector: "iframe",
//   standalone: true,
//   imports: [SafeUrlPipe],
//   templateUrl: "./iframe.html",
//   styleUrl: "./iframe.css",
// })
// export class Iframe {
//   private api = inject(ApiService);
//   private router = inject(Router);
//   private domsafe = inject(SafeUrlPipe);

//   eventId: string | null = null;
//   iframeUrl: any | null = null;
//   matchList: any;

//   constructor(
//     private route: ActivatedRoute,
//     private domSanitizer: DomSanitizer
//   ) {}

//   ngOnInit(): void {
//     this.eventId = this.route.snapshot.paramMap.get("eventId");

//     if (this.eventId) this.getMatchesByEventId();
//   }

//   getMatchesByEventId() {
//     this.api.getMatchByEventId({ eventId: this.eventId }).subscribe({
//       next: (res: any) => {
//         this.matchList = res.data;
//         console.log("MATCH DATA =>", this.matchList);

//         if (!this.matchList) {
//           return this.router.navigate(["/app/score-not-found"]);
//         }

//         // this.iframeUrl = this.generateLmtUrl(
//         //   this.matchList.scoreType,
//         //   this.matchList.scoreId,
//         //   this.matchList.gameId
//         // );

//         const finalUrl = this.generateLmtUrl(
//           this.matchList.scoreType,
//           this.matchList.scoreId,
//           this.matchList.gameId
//         );

//         //   window.location.href = finalUrl;
//         window.open(finalUrl, "_blank");

//         this.iframeUrl = finalUrl;
//         // this.setUrlAndRedirect(this.iframeUrl)
//         console.log("FINAL URL =>", this.iframeUrl);

//         if (!this.iframeUrl || this.matchList.scoreId == "0") {
//           this.router.navigate(["/app/score-not-found"]);
//         }
//       },

//       error: () => this.router.navigate(["/app/score-not-found"]),
//     });
//   }

//   //  setUrlAndRedirect(rawUrl: string) {
//   //   this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(rawUrl);
//   //   document.location.replace(rawUrl);
//   // }

//   generateLmtUrl(sourceType: string, scoreId: number, gameId: number) {
//     switch (sourceType) {
//       case "Ckex":
//         return `https://live.ckex.xyz/lmt/preview.html?matchId=${scoreId}`;

//       case "Leon Bet": {
//         const baseUrl =
//           "https://ru.leonspwidget.com/iframe-widgets/dark/sportradarLiveMatchTracker";
//         const family =
//           gameId == 4 ? "Cricket" : gameId == 1 ? "Soccer" : "Tennis";

//         return `${baseUrl}?matchId=${scoreId}&type=match.lmtPlus&lang=en&family=${family}`;
//       }

//       case "SS8":
//         return `https://lmt.ss8055.com/index?Id=${scoreId}&t=d`;

//       case "Fasthik":
//         return `https://fasthit.uk/skyclnt/scoreboard-widget/?id=${scoreId}&t=b`;

//       default:
//         return "";
//     }
//   }
// }

