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
  isLoading: boolean;

  form: FormGroup<{
    loginId: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    loginId: new FormControl<string>(null, [
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
      .login()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          this.handleSubmitRes();
        },

        () => this.msg.error("شماره تلفن همراه یا رمز عبور اشتباه است.")
      );
  }

  handleSubmitRes() {
    // console.log('res',res);

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
    this.stateService.setState("signedIn", true);
    //  this.stateService.setState('me', user);
    this.router.navigate(["/"]);
    // }
  }
}
