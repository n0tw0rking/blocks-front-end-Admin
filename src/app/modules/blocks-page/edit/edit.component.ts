import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {             
  constructor( private route: ActivatedRoute,  private router: Router ) { }
  id = 0;
  order: any;

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.order = params;
    // }
    //  this.getBlock(this.id)
    //  this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
     //display the params
    // this.route.queryParams.subscribe(params => {
      console.log(params);
    })
  

    // console.log(this.route.snapshot.queryParams, 'queryparam');
    // console.log(this.route.snapshot.fragment, 'fragmants');
    // this.route.queryParams
    //   .subscribe(data => console.log(data.id, 'data.id'))
        // (queryParams: Params) => {
        //   this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        // }
  }
  
  getBlock(id){
    console.log(id, 'getById')
  }
}
