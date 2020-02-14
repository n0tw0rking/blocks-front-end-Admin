import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = [];
  loading = true;
  submitted = false;
  notifyMessage = "";

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.createForm();
    this.route.params.subscribe(params => {
      if (params.registered === "success") {
        this.notifyMessage =
          "You have been successfully registered, you can log in now";
      }
    });
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    this.submitted = true;
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        if (token.errors) {
          console.log(token.errors[0].message);
          this.errors = token.errors[0].message;
        } else {
          if (token.data.login.isSuperAdmin) {
            console.log(" this is the superAdmin");
            this.router.navigate(["/"]);
          } else if (token.data.login.isAdmin) {
            console.log(token);
            console.log("this is the Admin");
            this.router.navigate(["/"]);
          } else {
            console.log("this is the user");
            this.router.navigate(["/login"]);
          }
        }
      },
      errorResponse => {
        console.log(errorResponse);
        // this.errors = errorResponse.error.errors;
      }
    );
  }
}
