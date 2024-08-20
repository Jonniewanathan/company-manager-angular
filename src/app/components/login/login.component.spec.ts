import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        LoginComponent // Using standalone component
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls and the expected validators', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    expect(usernameControl).not.toBeNull();
    expect(passwordControl).not.toBeNull();

    expect(usernameControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);

    passwordControl?.setValue('short');
    expect(passwordControl?.hasError('minlength')).toBe(true);

    passwordControl?.setValue('validPassword');
    expect(passwordControl?.hasError('minlength')).toBe(false);
  });

  it('should call authService.login, save the token, and navigate to root on successful login', () => {
    const username = 'testuser';
    const password = 'password123';
    const mockToken = 'mockToken';
    authService.login.and.returnValue(of({ token: mockToken }));

    component.loginForm.setValue({ username, password });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(authService.saveToken).toHaveBeenCalledWith(mockToken);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not call authService.login if the form is invalid', () => {
    component.loginForm.setValue({ username: '', password: 'short' });
    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(authService.saveToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should log an error and not navigate on login failure', () => {
    const username = 'testuser';
    const password = 'password123';
    const errorResponse = new Error('Login failed');
    authService.login.and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');

    component.loginForm.setValue({ username, password });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(console.error).toHaveBeenCalledWith('Login failed', errorResponse);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to register page when register is clicked', () => {
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
