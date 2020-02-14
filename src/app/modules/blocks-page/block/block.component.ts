import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.css"]
})
export class BlockComponent implements OnInit {
  @Input() block: {
    id: number;
    name: string;
    location: string;
    blockSubscriptions: [];
    status: string;
    dateOfSubscreption: string;
  };
  paramsSubscription: Subscription;

  // @Input() block;

  constructor(private route: ActivatedRoute) {}
  id = 0;
  name = "";
  ngOnInit() {
    console.log(this.block);
    // this.block = {
    //   id: this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name'],
    //   location:'',
    //   status: '',
    //   dateOfSubscreption:''
    // };
    // console.log( this.route.snapshot.params['id'], 'snapshot')
    // this.paramsSubscription = this.route.params
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       // this.block.id = params['id'];
    // this.block.name = params['name'];
    // console.log(this.block)
    //   }
    // );
  }
}
