import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find, map } from 'rxjs';
import { AuthData } from 'src/app/shared/model/authData';
import { LocalStorageService } from 'src/app/shared/storage/services/local-storage/local-storage.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-voting-phase',
  templateUrl: './game-voting-phase.component.html',
  styleUrls: ['./game-voting-phase.component.scss']
})
export class GameVotingPhaseComponent {
  memes$ = this.gameService.memes$;
  uuid: string;

  constructor(
    private gameService: GameService,
    private localeStorage: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) uuid: string
  ) {
    this.uuid = uuid;
  }

  sendVote(uuid: string, vote: string) {
    this.gameService.sendVote(uuid, vote);
  }

  isUserCard(imageKey: string) {
    const authData: AuthData | null = this.localeStorage.getItem('authData');
    return this.memes$.pipe(
      find((data) => {
        return data[imageKey].includes(authData ? authData.username : '');
      }),
    )
  }
}
