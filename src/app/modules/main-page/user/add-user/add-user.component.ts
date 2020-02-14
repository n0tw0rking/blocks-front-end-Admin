import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ApolloService } from '../../../../core/apollo.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  newUserForm:FormGroup
  selectedValue :any ;

  constructor(private formbuilder: FormBuilder, private router: Router, private polo: ApolloService) { }
//email:"user1",password:"user1",isAdmin:false}
  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.newUserForm = this.formbuilder.group({
      email: [ "" ],
      password: ["", Validators.required],
      Subscription:[""],
      block: [""],
      type:[""]
    });
  }

  onNewForm(){
    // console.log(this.newblockForm.value)
    this.polo.createUser(this.newUserForm.value)
    .subscribe(
      res=>console.log(res),error=>{console.log(error)})
    
    // this.blocks.push(this.newblockForm.value)

    // this.router.navigate(["/blocks"]);

  }


}
