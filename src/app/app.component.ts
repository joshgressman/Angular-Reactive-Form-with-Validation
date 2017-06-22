import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
//Make sure ReactiveFormsModule is imported in app.module
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;   //Holds the data within the reactive form

  //Custom validator > will be used to make sure these names are not used
  forbiddenUsernames = ['Josh', 'Holly'];

 //initializes the value of the reactive form
//** Validation is done within the component not the template
 ngOnInit(){
   this.signupForm = new FormGroup({
    //  'userData': new FormGroup({}), you can do nested form controls, other propertires would go into the object
     'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //this.forbiddenNames = custom validator function
     'email':    new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
     'gender':   new FormControl('male'),
     'hobbies': new FormArray([])

   });
 }

 //access the form data upon submit
 onSubmit(){
  console.log(this.signupForm);
 }

 // Add hobbies to the hobbies array form control
 //The section in the html will dynamicaly add values to the hobbies array.
 onAddHobby(){
  //const control will push data to the hobbies array
  const control = new FormControl(null, Validators.required);
  (<FormArray>this.signupForm.get('hobbies')).push(control);
 }

 //Custom validation function
 forbiddenNames(control: FormControl): {[s: string]: boolean} {
   if(this.forbiddenUsernames.indexOf(control.value) !== -1 ){
     return {'nameIsForbbidden': true};
   }
   return null;
 }

 //Asyncronouse validators when sending to a server
 //the timeout function used to simualte reaching out to a server
 forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
   const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if(control.value === 'test@test.com'){
        resolve({'emailIsForbidden': true});
      } else {
        resolve(null);
      }
    }, 1500);
   });
   return promise;
 }



}
