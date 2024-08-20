import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const canActivate: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(authService.isAuthenticated());
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
