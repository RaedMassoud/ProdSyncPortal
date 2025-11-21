import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

import { catchError } from 'rxjs/operators';

const errorInterceptor = (req: any, next: any) => {
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: any) => {
      const msg = err?.error?.message;
      if (msg) {
        snack.open(msg, 'OK', { duration: 4000 });
      }
      throw err;
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    MatSnackBarModule
  ]
};
