import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from "@angular/forms";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  // showButton: Boolean = false;
  // buttonType: any = "";
  // checkForm = new FormGroup({
  //   buttonCheck: new FormControl(),
  // });

  // toCheckEvenOrOdd() {
  //   let formValue = this.checkForm.value.buttonCheck;
  //   console.log(formValue);

  //   if(!formValue){
  //     return
  //   }

  //   if (formValue % 2 == 0) {
  //     this.showButton = true;
  //     this.buttonType = "even";
  //   } else {
  //     this.showButton = true;
  //     this.buttonType = "odd";
  //   }
  // }





// showButton:Boolean=false;
// buttonValue:Number

// loopNumber:any=[
//  {
//   name:"India",value :"+91",
 
//  },
//  { name:"PAK",value:"+59"},
//  {name:"China",value:"+75"}
// ]

   
//   OddEvenForm=new FormGroup({
//     inputNumber:new FormControl(),
//   })


//   toCheckFormValue(){
//     let inputFormValue=this.OddEvenForm.value.inputNumber;

//     if(inputFormValue%2==0){
//       this.showButton=true;
//       this.buttonValue=1
//     }else{
//        this.showButton=true;
//       this.buttonValue=2
//     }



  }



