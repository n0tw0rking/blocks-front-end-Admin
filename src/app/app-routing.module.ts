import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./modules/main-page/user/users.component";
import { LoginComponent } from "./modules/login/login.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { AuthGuard } from "./core/auth.guard";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SuperAdminComponent } from "./modules/super-admin/super-admin.component";
import { EditComponent } from "./modules/blocks-page/edit/edit.component";
import { AddBlockComponent } from "./modules/blocks-page/add-block/add-block.component";
import { AddUserComponent } from "./modules/main-page/user/add-user/add-user.component";
import { BalanceEditComponent } from "./modules/main-page/user/balance-edit/balance-edit.component";
import { ErrorPageComponent } from "./modules/error-page/error-page.component";

const routes: Routes = [
  {
    path: "super",
    component: SuperAdminComponent
    // canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "", component: MainPageComponent },
  // { path:'user', component: UserComponent,  canActivate:[AuthGuard] ,
  { path: "user/add", component: AddUserComponent },
  { path: "user/balance/:id", component: BalanceEditComponent },
  { path: "user/:id", component: UsersComponent },

  {
    path: "user",
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: UsersComponent }
    //   // { path: ":id", component: UsersComponent }
    ]
  },
  {
    path: "services",
    component: ServicesPageComponent
    // canActivate: [AuthGuard]
  },
  /*
  NOTES FROM ADAM:
I have added the name so I can search by name
  */
  //
  {
    path: "services/:id",
    component: ServicesPageComponent
    // canActivate: [AuthGuard]
  },
  // { path: "blocks", component: BlocksPageComponent },
  {
    path: "blocks",
    component: BlocksPageComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "", component: BlockComponent }
      // {path: 'edit/:id', component: EditComponent}
    ]
  },
  { path: "blocks/add", component: AddBlockComponent },
  { path: "blocks/edit/:name", component: EditComponent }

  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  // { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
