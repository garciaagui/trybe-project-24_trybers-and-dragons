import Battle from './Battle';
import Fighter from '../Fighter';

export default class PVP extends Battle {
  private _player1: Fighter;
  private _player2: Fighter;

  constructor(player1: Fighter, player2: Fighter) {
    super(player1);
    this._player1 = player1;
    this._player2 = player2;
  }

  fight(): number {
    while (this._player1.lifePoints > 0 && this._player2.lifePoints > 0) {
      this._player1.attack(this._player2);
      if (this._player2.lifePoints < 0) break; 
      this._player2.attack(this._player1);
    }
    return this._player1.lifePoints === -1 ? -1 : 1;
  }
}