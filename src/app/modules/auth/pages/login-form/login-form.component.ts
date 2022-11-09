import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Router, RouterModule } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { AuthService } from "../../services";
import { finalize } from "rxjs";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";
import { StateService } from "src/app/core/services";
import { ILoginResponse } from "../../interfaces";
import { HttpHeaders } from "@angular/common/http";
import { IUser } from "src/shared/common/src/lib/interfaces";
export interface ILoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzCardModule,
    NzCheckboxModule,
    NzIconModule,
    NzMessageModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.less"],
})
export class LoginFormComponent implements OnInit {
  passwordVisible: boolean = false;
  user: IUser;
  isLoading: boolean;

  form: FormGroup<ILoginForm> = new FormGroup({
    username: new FormControl<string>(null, [
      // Validators.pattern('^09.{9}$'),
      Validators.required,
    ]),
    password: new FormControl<string>(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          
          this.handleSubmitRes();
        },

        () => this.msg.error("نام کاربری یا رمز عبور اشتباه است.")
      );
  }

  handleSubmitRes() {
    // localStorage.setItem('user', user);
    this.authService
    .grtUserInfo(this.form.value.username)
    .subscribe((info) => {
      this.user = info;
      //localStorage.setItem('user', this.user);
      this.stateService.setState("signedIn", true);
      this.stateService.setState("me", this.user);
      this.router.navigate(["/"]);
    });
    
    // this.authService.getUserRole(this.form.get('loginId').value).subscribe(()=>{
    //   this.stateService.setState("signedIn", true);
    //   this.router.navigate(["/"]);
    // });

    // const { token, refreshToken, tokenExpirationInstant, user } = res;
    // localStorage.setItem('token', token);
    // localStorage.setItem('refreshToken', refreshToken);
    // localStorage.setItem('tokenExpirationInstant', tokenExpirationInstant);
    // if (!res.user.data.is_otp_verified) {
    //   this.router.navigate(['/','auth', 'verify'], {
    //     queryParams: {
    //       mobile: res.user.data.mobile,
    //     },
    //   });
    // } else {
   
    // }
  }
}
