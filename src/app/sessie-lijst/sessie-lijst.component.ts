import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Sessie } from '../sessie/sessie.model';
import { SessieDataService } from '../sessie-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { SessieEmptyComponent } from '../sessie-empty/sessie-empty.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseOptionsToken } from 'angularfire2';
import { firebaseAndroidConfig } from 'src/environments/environment';

@Component({
  selector: 'app-sessie-lijst',
  templateUrl: './sessie-lijst.component.html',
  styleUrls: ['./sessie-lijst.component.css'],
  providers: [{ provide: FirebaseOptionsToken, useValue: firebaseAndroidConfig }]
})
export class SessieLijstComponent implements OnInit, OnChanges {
  private _sessie: Sessie;
  private _sessies: Sessie[];
  public errorMsg: string;

  constructor(public db: AngularFirestore, public dialog: MatDialog, private _sessieDataService: SessieDataService) {}

  ngOnInit() {
    this.getSessies();
  }

  ngOnChanges() {
    this.getSessies();
  }

  get sessies(): Sessie[] {
    return this._sessies;
  }

  get sessie(): Sessie {
    return this._sessie;
  }

  // HTTP Get request to get all sessies
  getSessies() {
    return this._sessieDataService
      .getSessies()
      .subscribe(
        sessies => (this._sessies = sessies),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
            } while trying to retrieve sessies: ${error.error}`;
        }
      );
  }

  // Show sessie info view
  toonSessieInfo(sessie: Sessie): Sessie {
    this._sessie = sessie;
    return this._sessie;
  }

  // Checks if sessie is clicked
  sessieGekozen(): boolean {
    if (this._sessie != null) {
      return true;
    }
    return false;
  }

  // Add new sessie
  openEmptyDialog(): void {
    const dialogRef = this.dialog.open(SessieEmptyComponent, {
      minWidth: 300,
      data: this.sessie
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._sessies.push(result);
      }
      setTimeout(() => {
        this.getSessies();
      }, 200);
    });
  }

}
