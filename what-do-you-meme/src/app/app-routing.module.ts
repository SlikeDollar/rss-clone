import {inject, NgModule} from '@angular/core';
import {Route, Router, RouterModule, Routes, UrlSegment} from '@angular/router';
import {UserGuestGuard} from "./user/guards/user-guest.guard";
import {UserAuthGuard} from "./user/guards/user-auth.guard";
import {StoreModule} from "@ngrx/store";
import {DEFAULT_ROUTER_FEATURENAME, routerReducer} from "@ngrx/router-store";
import {UserPermissionsService} from "./utils/user-permissions.service";
import {map} from "rxjs";

const routes: Routes = [
  {
    path: 'user/auth',
    loadChildren: () => import('./auth/user-auth.module')
      .then(module => module.UserAuthModule),
    canLoad: [UserGuestGuard],
    canActivate: [UserGuestGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(module => module.UserModule),
    canMatch: [(_route: Route, _segments: UrlSegment[]) => {
      const router = inject(Router);
      return inject(UserPermissionsService).isUser$.pipe(
        map(isUser => isUser || router.createUrlTree(['']))
      );
    }],
    canActivate: [UserAuthGuard],
  },
  { path: 'game', loadChildren: () => import('./game/game.module').then(module => module.GameModule)},
  { path: 'lobbies', loadChildren: () => import('./lobbies/lobbies.module').then(module => module.LobbiesModule) },
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule)},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer)],
  exports: [RouterModule],
  providers: [UserGuestGuard, UserAuthGuard]
})
export class AppRoutingModule { }
