import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeFOrm();
  }

  initializeFOrm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl
    })
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, error => {
    //   console.log(error);
    //   this.toastr.error(error.error);
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
