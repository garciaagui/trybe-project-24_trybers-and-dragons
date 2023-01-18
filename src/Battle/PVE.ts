import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

export default class PVE extends Battle {
  private _character: Fighter;
  private _monsters: SimpleFighter[];

  constructor(character: Fighter, monsters: SimpleFighter[]) {
    super(character);
    this._character = character;
    this._monsters = monsters;
  }

  private individualFight(monster: SimpleFighter):void {
    while (this._character.lifePoints > 0 && monster.lifePoints > 0) {
      this._character.attack(monster);
      if (monster.lifePoints < 0) break; 
      monster.attack(this._character);
    }
  }

  fight(): number {
    for (let i = 0; i < this._monsters.length; i += 1) {
      this.individualFight(this._monsters[i]);
      if (this._character.lifePoints < 0) break;
    }

    return this._character.lifePoints === -1 ? -1 : 1;
  }
}