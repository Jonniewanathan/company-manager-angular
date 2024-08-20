import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { canActivate } from './auth.guard';
import { AuthService } from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let isAuthenticatedSpy: jasmine.Spy;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    isAuthenticatedSpy = authServiceSpy.isAuthenticated.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    TestBed.runInInjectionContext(() => canActivate(null as any, null as any));
  });

  it('should allow activation when the user is authenticated', () => {
    isAuthenticatedSpy.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => canActivate(null as any, null as any));

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and redirect to /login when the user is not authenticated', () => {
    isAuthenticatedSpy.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => canActivate(null as any, null as any));

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});

