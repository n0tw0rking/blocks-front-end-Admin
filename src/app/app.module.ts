import { BrowserModule } from "@angular/platform-browser";
import * as $ from "jquery";
import { HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { Apollo } from "apollo-angular";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { UsersComponent } from "./modules/main-page/user/users.component";
import { LoginComponent } from "./modules/login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { ServiceComponent } from "./modules/services-page/service/service.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SidebarComponent } from "./modules/shared/sidebar/sidebar.component";
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "./modules/shared/header-navigation/navigation.component";
import { BreadcrumbComponent } from "./modules/shared/breadcrumb/breadcrumb.component";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
import { TokenInterceptor } from "./core/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GraphQLModule } from "./graphql.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./core/auth.service";
import { AuthGuard } from "./core/auth.guard";
import { ApolloService } from "./core/apollo.service";
import { SuperAdminComponent } from "./modules/super-admin/super-admin.component";
import { EditComponent } from "./modules/blocks-page/edit/edit.component";
import { AddBlockComponent } from "./modules/blocks-page/add-block/add-block.component";
import { AddUserComponent } from "./modules/main-page/user/add-user/add-user.component";
import { BalanceEditComponent } from "./modules/main-page/user/balance-edit/balance-edit.component";
import { ErrorPageComponent } from "./modules/error-page/error-page.component";
import { NotificationComponent } from './modules/main-page/notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UsersComponent,
    LoginComponent,
    ServicesPageComponent,
    ServiceComponent,
    BlocksPageComponent,
    BlockComponent,
    SidebarComponent,
    NavigationComponent,
    BreadcrumbComponent,
    AddBlockComponent,
    EditComponent,
    SuperAdminComponent,
    AddUserComponent,
    BalanceEditComponent,
    ErrorPageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApolloService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
