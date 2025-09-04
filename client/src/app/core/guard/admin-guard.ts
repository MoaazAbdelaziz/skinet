import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { SnackbarService } from '../services/snackbar-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);

  if(accountService.isAdmin()) {
    return true;
  }
  else {
    snackbarService.error('You must be an admin to access this page');
    router.navigateByUrl('/shop');
    return false;
  }
};
