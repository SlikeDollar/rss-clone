import { Component, OnInit  } from '@angular/core';
import { GameLobbyData, GameCurrentData } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent implements OnInit {
  isClosed: boolean = false;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.gameService.joinLobbyEvent().subscribe((gameData: GameCurrentData) => {
      console.log('joined');
      this.gameService.gameData = gameData;
    });

    this.gameService.leaveLobbyEvent().subscribe((gameData: GameCurrentData) => {
      console.log('left');
      this.gameService.gameData = gameData;
    });
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }
}
