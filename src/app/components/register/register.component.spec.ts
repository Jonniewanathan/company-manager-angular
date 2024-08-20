import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls and the expected validators', () => {
    const usernameControl = component.registerForm.get('username');
    const passwordControl = component.registerForm.get('password');

    expect(usernameControl).not.toBeNull();
    expect(passwordControl).not.toBeNull();

    expect(usernameControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);

    passwordControl?.setValue('short');
    expect(passwordControl?.hasError('minlength')).toBe(true);

    passwordControl?.setValue('validPassword');
    expect(passwordControl?.hasError('minlength')).toBe(false);
  });

  it('should call authService.register and navigate to /login on successful registration', () => {
    const username = 'testuser';
    const password = 'password123';
    authService.register.and.returnValue(of({})); // Simulate successful registration

    component.registerForm.setValue({ username, password });
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(username, password);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not call authService.register if the form is invalid', () => {
    component.registerForm.setValue({ username: '', password: 'short' });
    component.onSubmit();

    expect(authService.register).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should log an error and not navigate on registration failure', () => {
    const username = 'testuser';
    const password = 'password123';
    const errorResponse = new Error('Registration failed');
    authService.register.and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');

    component.registerForm.setValue({ username, password });
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(username, password);
    expect(console.error).toHaveBeenCalledWith('Registration failed', errorResponse);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'complete');

    component.ngOnDestroy();

    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });
});
