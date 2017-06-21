import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Make sure ReactiveFormsModule is imported in app.module
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;   //Holds the data within the reactive form

 //initializes the value of the reactive form
//** Validation is done within the component not the template
 ngOnInit(){
   this.signupForm = new FormGroup({
     'username': new FormControl(null, Validators.required),
     'email':    new FormControl(null, [Validators.required, Validators.email]),
     'gender':   new FormControl('male')

   });
 }

 //access the form data upon submit
 onSubmit(){
  console.log(this.signupForm);
 }
}
