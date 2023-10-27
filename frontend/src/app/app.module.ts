import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de importar BrowserAnimationsModule


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    DataTablesModule,
    HttpClientModule,
    ModalModule.forRoot(),// Configura ModalModule de ngx-bootstrap
    ToastrModule.forRoot({positionClass: 'toast-top-right',}) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
