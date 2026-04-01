import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Vérifie si l'utilisateur est authentifié
  const userData = localStorage.getItem('currentUser');

  if (!userData) {
    // Si l'utilisateur n'est pas authentifié, , redirige vers la page de connexion
    router.navigate(['/login']);
    return false; // Prévient l'accès aux routes protégées
  }

  // Si l'utilisateur est authentifié, permet l'accès aux routes protégées
  return true;
};
