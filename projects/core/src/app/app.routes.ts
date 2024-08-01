import { Routes } from '@angular/router';
import { appRoutesNames } from './app-routes.names';
import { movieResolver, tvResolver } from './resolvers/genre';

export const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutesNames.home,
    pathMatch: 'full',
  },
  {
    path: appRoutesNames.home,
    loadComponent: () =>
      import('./pages/home/home.component').then(
        ({ HomeComponent }) => HomeComponent
      ),
    resolve: { movieGenre: movieResolver, tvGenre: tvResolver },
  },
];
