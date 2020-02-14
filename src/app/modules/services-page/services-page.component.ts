import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { Router, ActivatedRoute } from "@angular/router";
import { async } from "@angular/core/testing";
// @Output() open: EventEmitter<any>
// @Output() close: EventEmitter<any>

@Component({
  selector: "app-services-page",
  templateUrl: "./services-page.component.html",
  styleUrls: ["./services-page.component.css"]
})
export class ServicesPageComponent implements OnInit {
  services = [];
  blockId;
  loading = true;
  error = "";
  constructor(
    private appollo: ApolloService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blockId =
        parseInt(params.id) !== null || undefined ? parseInt(params.id) : "";
      console.log(this.blockId);
    });
    if (this.blockId !== undefined && this.blockId && this.blockId !== null) {
      this.appollo.getServicesByBlockId(this.blockId).subscribe(
        result => {
          if (result.errors) {
            this.loading = false;
            console.log(result.errors[0].message);
            /*NOTE: This folliwing part is for error handlings checking the Error to display ..
          "This block has 0 service"
          */
            this.error =
              result.errors[0].message === "Unexpected Execution Error" ||
              "Variable`blockId` of type`Int!` must not be null."
                ? "This block has 0 service "
                : result.errors[0].message;
          } else {
            result.data.blockServices.blockSubscriptions.forEach(obj => {
              obj.subscription.aServiceSubscriptions.forEach(obj => {
                this.services.push(obj.service);
              });
            });
            this.error = !this.services.length
              ? "This block has 0 service "
              : null;
            this.loading = result.data.loading;
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    } else {
      this.appollo.getAllServices().subscribe(
        result => {
          if (result.errors) {
            this.loading = result.data.loading;
            console.log(result.errors[0].message);
          } else {
            this.services = result.data.services;
            this.loading = result.data.loading;
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    }
  }
  updateParent($event) {
    this.services[$event].isActive = !this.services[$event].isActive;
  }
}
