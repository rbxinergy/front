import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { ConfigsComponent } from './components/dashboard/configs/configs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
// import { MatTableModule } from '@angular/material/table'  
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CompanyComponent } from './components/dashboard/company/company.component';
import { StepperModule } from './components/dashboard/stepper.module';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { ObjectToArrayPipe } from 'src/app/object-to-array.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,

    ConfigsComponent,

    ObjectToArrayPipe

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,MatIconModule, MatListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    // error solution NullInjectError
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    BrowserAnimationsModule,
    // aquí importo el modulo que contiene los componentes del stepper en dashboard
    StepperModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
