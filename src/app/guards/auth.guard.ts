import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterState, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  const routr = inject(Router);
  const token = sessionStorage.getItem('token')

  if (token) {
    return true
  }
  else {
    routr.navigate([''])
    return false
  }
  return true;
};
