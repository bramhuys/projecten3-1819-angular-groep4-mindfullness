import { Injectable } from '@angular/core';
import { Klant } from './klant/klant.model';

@Injectable()
export class KlantDataService {
  private _klanten = new Array<Klant>();

  constructor() { 
    const klant1 = new Klant('Simon', 'Anckaert', new Date('03/20/1996'), 'simon.anckaert@hotmail.com');
    klant1.geblokkeerd();
    const klant2 = new Klant('Arno', 'Coorevits', new Date('03/08/1996'), 'arno.coorevits@hotmail.com');
    const klant3 = new Klant('Angelo', 'Carly', new Date('03/08/1996'), 'angelo.carly@hotmail.com');
    const klant4 = new Klant('Jolan', 'Taelman', new Date('03/08/1996'), 'jolan.taelman@hotmail.com');
    const klant5 = new Klant('Bram', 'Huys', new Date('03/08/1996'), 'bram.huys@hotmail.com');
    const klant6 = new Klant('Stijn', 'De Raeve', new Date('03/08/1996'), 'stijn.deraeve@hotmail.com');
    const klant7 = new Klant('Bart', 'Cannaerts', new Date('03/08/1996'), 'bart.cannaerts@hotmail.com');
    const klant8 = new Klant('Sjaak', 'Choco', new Date('03/08/1996'), 'sjaak.choco@hotmail.com');
    this._klanten.push(klant1,klant2,klant3,klant4,klant5,klant6,klant7,klant8);

  }

  get klanten(): Klant[] {
    return this._klanten;
  }


  voegNieuweKlantToe(klant: Klant) {
    this._klanten.push(klant);
  }
}