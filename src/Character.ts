import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this._name, this._dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this._archetype.energyType, 
      amount: getRandomInt(1, 10), 
    };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    }; 
  }

  private calculateDamage(attackPoints:number):number {
    let damage = attackPoints - this._defense;
    if (damage <= 0) damage = 1;
    return damage;
  }

  private calculateNewMaxLifePoints():number {
    const upgrade = getRandomInt(1, 10);
    if ((this._maxLifePoints + upgrade) > this._race.maxLifePoints) {
      return this._race.maxLifePoints;
    }
    return this._maxLifePoints + upgrade;
  }

  receiveDamage(attackPoints:number):number {
    const damage = this.calculateDamage(attackPoints);
    this._lifePoints -= damage;

    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  attack(enemy: Fighter):void {
    enemy.receiveDamage(this._strength);
    console.log(`${enemy} received an attack!`);
  }

  special?(enemy: Fighter):void {
    enemy.receiveDamage(this._strength * (getRandomInt(1, 3)));
    console.log(`${enemy} received an special attack!`);
  }

  levelUp():void {
    this._maxLifePoints = this.calculateNewMaxLifePoints();
    this._lifePoints = this._maxLifePoints;
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
  }
}