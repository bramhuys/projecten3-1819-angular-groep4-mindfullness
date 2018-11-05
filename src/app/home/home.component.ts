import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _datum: Date;
  private _uur: Number;

  constructor() {
    this._datum = new Date();
    this._uur = this._datum.getHours();
   }

  ngOnInit() {
  }

  get datum(): Date {
    return this._datum;
  }

  get uur(): Number {
    return this._uur;
  }

  /* Functie die naargelang de tijd de gebruiker begroet*/
  get berekenGroet(): string {
    if (this.uur < 6) {
      return 'Goeienacht ';
    } else if (this.uur < 12) {
      return 'Goeiemorgen ';
    } else if (this.uur < 14) {
      return 'Goeiemiddag ';
    } else if (this.uur < 18) {
      return 'Goeienamiddag ';
    } else if (this.uur < 22) {
      return 'Goeieavond ';
    } else if (this.uur < 24) {
      return 'Goeienacht ';
    } else {
      return 'Sorry ik weet niet hoe laat het is, ';
    }
  }
}
