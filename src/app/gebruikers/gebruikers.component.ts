import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {
  MatTableDataSource,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { GebruikerDataService } from '../gebruiker-data.service';

export interface Groep {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gebruikers',
  templateUrl: './gebruikers.component.html',
  styleUrls: ['./gebruikers.component.css']
})
export class GebruikersComponent implements OnInit {
  private _gebruikers: Observable<any[]>;

  public groepen: Groep[] = [];
  public groepNummers = [' A '];
  public selectedGroepNr = ' A ';

  public selectedGroep = 'alle gebruikers';

  displayedColumns: string[] = ['name', 'email', 'group', 'delete'];
  dataSource: MatTableDataSource<any>;

  constructor(
    public afDb: AngularFireDatabase,
    public af: AngularFireAuth,
    public gService: GebruikerDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this._gebruikers = this.getItems();
    this._gebruikers.subscribe(result => {
      this.setGroepen(result);
      this.dataSource = new MatTableDataSource(result);
      console.log(this.dataSource.data);
    });
  }

  getItems(): Observable<any[]> {
    return this.gService.getUsers();
  }

  get items(): Observable<any[]> {
    return this._gebruikers;
  }

  ngOnInit() {}

  setGroepen(result: any[]) {
    result.forEach(gebruiker => {
      if (
        gebruiker.groepnr !== undefined &&
        this.groepNummers.indexOf(gebruiker.groepnr) === -1
      ) {
        this.groepNummers.push(gebruiker.groepnr);
      }
    });

    this.groepNummers.sort();

    this.groepNummers.forEach(nummer => {
      if (nummer !== ' A ') {
        this.groepen.push({ value: nummer, viewValue: 'Groep ' + nummer });
      } else {
        this.groepen.push({ value: nummer, viewValue: 'Geen groep' });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyGroepFilter(filterValue: string) {
    this._gebruikers.subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      if (filterValue !== ' A ') {
        const newData = [];
        this.dataSource.data.forEach(element => {
          if (element.groepnr === filterValue) {
            newData.push(element);
          }
        });
        this.dataSource = new MatTableDataSource(newData);
        this.selectedGroep = 'Groep ' + filterValue;
        this.selectedGroepNr = filterValue;
      } else {
        this.selectedGroep = 'alle gebruikers';
        this.selectedGroepNr = ' A ';
      }
    });
  }

  changeGroup(uid, nr) {
    const gebruiker = this.gService.getUserById(uid);
    gebruiker.subscribe(result => {
      let telnr = 0;
      if (result.telnr) {
        telnr = result.telnr;
      }

      let regio = '';
      if (result.regio) {
        regio = result.regio;
      }

      const updatedGebruiker = {
        email: result.email,
        groepnr: nr.value.toString(),
        name: result.name,
        tel: telnr,
        regio: regio
      };
      this.gService
        .updateUser(uid, updatedGebruiker)
        .subscribe(val => console.log(val));
      this.showSnackBar(updatedGebruiker.name, 'ok');
    });
  }

  showSnackBar(naam: string, action: string) {
    this.snackbar.open('Groepsnummer van ' + naam + ' succesvol gewijzigd!', action, {
      duration: 2000,
    });
  }

  addGroup() {
    const n: number = +this.groepen[this.groepen.length - 1].value + 1;
    console.log(n);
    this.groepen.push({ value: n.toString(), viewValue: 'Groep ' + n });
    this.groepNummers.push(n.toString());
  }

  // Show alert dialog before removing user
  removeUser(uid): void {
    const gebruiker = this.gService.getUserById(uid);
    gebruiker.subscribe(result => {
      const dialogRef = this.dialog.open(DialogAlert, {
        minWidth: 300,
        data: {
          dataName: result.name,
          dataUid: uid
        }
      });

      dialogRef.afterClosed().subscribe(r => {
        if (r) {
          // REMOVE USER
          console.log('Not yet implemented');
        }
      });
    });
  }
}

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog.alert.html'
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
