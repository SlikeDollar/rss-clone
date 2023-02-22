import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {BehaviorSubject, distinctUntilChanged} from 'rxjs';
import { IoInput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData } from '../models/game.model';
import {ConfigService} from "../../shared/services/config/config.service";
import {map} from "rxjs/operators";

const initialGameState: GameCurrentData = {
  currentRound: 0,
  rounds: [''],
  memes: {
    '': ['']
  },
  players: {
    slikedollar: {
      username: '',
      score: 0,
      image: '',
      meme: '',
      vote: '',
    }
  },
  status: 'end',
  votes: {
    '': ['']
  }
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL = ConfigService.SERVER_URL;
  usedMeme: string[] = [];
  private gameData$$ = new BehaviorSubject<GameCurrentData>(initialGameState);
  public gameData$ = this.gameData$$.asObservable();
  public players$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return Object.values(gameData.players);
    }),
    distinctUntilChanged()
  );
  public memes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.memes;
    }),
    distinctUntilChanged()
  );
  public votes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.votes;
    }),
    distinctUntilChanged()
  );
  public currentRound$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.currentRound;
    }),
    distinctUntilChanged()
  );
  public rounds$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.rounds.slice(-1);
    })
  );
  private playerCards$$ = new BehaviorSubject<string[]>([])
  public playerCards$ = this.playerCards$$.asObservable();
  constructor(private http: HttpClient, private socket: Socket) { }

  changeGameData(newData: GameCurrentData) {
    this.gameData$$.next(newData);
  }

  clearUsedMemes() {
    this.usedMeme.length = 0;
  }

  isLobbyOwner(username: string, uuid: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-lobby-owner`, {
      params: { username, uuid }
    });
  }

  getPlayerCards() {
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (memesList: string[]) => {
      this.playerCards$$.next(memesList);
    });
  }

  sendVote(uuid: string, vote: string) {
    this.socket.emit(IoInput.getVote, {
      uuid,
      vote,
    })
  }
}
