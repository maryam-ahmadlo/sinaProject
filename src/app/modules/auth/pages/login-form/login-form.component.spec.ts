import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginFormComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('component initial state', () => {
    expect(component.isLoading).toBeFalsy();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
    component.form.patchValue({
      loginId: 'admin@tenian.ir',
      password: '987654321',
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('submitted should be form valid when onSubmit()', () => {
    component.onSubmit();
  });

  // it('handleSubmit should be login request when 200', () => {
  //   jest.spyOn(component, 'handleSubmitRes');
  //   expect(component.handleSubmitRes).toHaveBeenCalled();
  // });
});
