import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass:string='none';
  displayMsg:string='';
  isAccountCreated:boolean=false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  RegisterForm=new FormGroup(
    {
      firstname:new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]),
      lastname:new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]),
      email:new FormControl('',[Validators.required,Validators.email]),
      mobile:new FormControl('',[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(11),Validators.maxLength(11)]),
      gender:new FormControl('',Validators.required),
      pwd:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
      rpwd:new FormControl('')
      
    });
     isUserValid:boolean=false;
     registerSubmited()
     {
       if(this.PWD.value==this.RPWD.value)
       {
        console.log(this.RegisterForm.valid);
        this.repeatPass='none'    
        this.authService.registerUser([this.RegisterForm.value.firstname,
          this.RegisterForm.value.lastname,
          this.RegisterForm.value.email,
          this.RegisterForm.value.mobile,
          this.RegisterForm.value.gender,
          this.RegisterForm.value.pwd
        ]).subscribe((res)=>
        {
         if(res =='Success')
         {
           this.displayMsg='Account Created Successfully!';
           this.isAccountCreated=true;
           
         }
         else if(res=='Already Exist')
         {
          this.displayMsg='Account Already Exist.Try another Email';
          this.isAccountCreated=false;
         }
         else
          {
            this.displayMsg='Something went wrong.';
            this.isAccountCreated=false;
         }
        });
       }
       else
       {
        this.repeatPass='inline'
       }
     }
  
     get FirstName():FormControl
     {
       return this.RegisterForm.get('firstname')as FormControl;
     }
     get LastName():FormControl
     {
       return this.RegisterForm.get('lastname')as FormControl;
     }

  get Email():FormControl
  {
    return this.RegisterForm.get('email')as FormControl;
  }
  get Mobile():FormControl
  {
    return this.RegisterForm.get('mobile')as FormControl;
  }
  get Gender():FormControl
  {
    return this.RegisterForm.get('gender')as FormControl;
  }
  get PWD():FormControl
  {
    return this.RegisterForm.get('pwd')as FormControl;
  }
  get RPWD():FormControl
  {
    return this.RegisterForm.get('rpwd')as FormControl;
  }
  }