import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterLink } from '@angular/router';
import { UserProfileComponent } from './layout/header/components/user-profile/user-profile.component';
import { NavigationComponent } from './layout/header/components/navigation/navigation.component';
import { SetPictureComponent } from './components/set-picture/set-picture.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    NavigationComponent,
    SetPictureComponent,
  ],
  imports: [CommonModule, RouterLink],
  exports: [HeaderComponent, FooterComponent, SetPictureComponent],
})
export class SharedModule {}
