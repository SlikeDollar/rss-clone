import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ModalPhasesService } from '../../services/modal-phases.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;

  constructor(
    private gameService: GameService,
    public modalPhasesService: ModalPhasesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    sessionStorage.setItem('url', this.router.url);
    this.gameService.joinLobbyRequest(this.gameId);

    this.gameService.changePhaseEvent().subscribe((data: GameCurrentData) => {
      switch (data.status) {
        case GameStatus.Prepare:
          console.log('prepare');
          break;

        case GameStatus.Situation:
          this.gameService.gameData = data;
          this.gameService.getMemes();
          this.modalPhasesService.closeVotingResultsModal();
          console.log('Situation');
          break;

        case GameStatus.Vote:
          this.modalPhasesService.openVotingModal();
          this.gameService.gameData = data;
          break;

        case GameStatus.Vote_results:
          console.log(data);
          this.modalPhasesService.closeVotingModal();
          this.modalPhasesService.openVotingResultsModal();
          break

        case GameStatus.End:
          this.modalPhasesService.closeVotingResultsModal();
          console.log('The End D:');
          console.log(data);
          break;
      }
    });

    this.gameService.errorSocketEvent().subscribe((data) => {
      console.log(data);
    });

    // Move to preload screen with "READY" button later
    setTimeout(() => {
      this.gameService.startGameRequest(this.gameId);
    }, 10000);
  }
}
