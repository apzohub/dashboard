import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

export class Auth{
  email = '';
  password = '';
  token: any;
}


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnChanges {

  hide = true;
  authForm: FormGroup;
  @Input() auth: Auth;

  returnUrl: string;
  
  
  /* ({
    email: new FormControl('', [Validators.required, Validators.email])
  }); */
  

  constructor(private fb: FormBuilder, private authService: AuthService, 
              private route: ActivatedRoute, private router: Router,) {
    this.createForm();
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
    this.rebuildForm();
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
    this.authForm.reset({
      email: this.auth.email,
      password: this.auth.password
    });
    // this.authForm.patchValue();
  }

  /* getErrorMessage() {
    return this.authForm.value.email.hasError('required') ? 'You must enter a value' :
      this.authForm.value.email.hasError('email') ? 'Not a valid email' : '';
  } */

  createForm() {
    this.authForm = this.fb.group({      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ]
    });
  }

  onSubmit() {
    const formModel = this.authForm.value;

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    this.auth = {
      email: formModel.email  as string,
      password: formModel.password as string,
      token:''
    };
    this.authService.login(this.auth).subscribe(/* error handling */);
    this.rebuildForm();
  }

  revert() { this.rebuildForm(); }
}


