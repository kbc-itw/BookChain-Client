import { Component, Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


// @Directive({
//   selector: '[bookchainNotImplemented]'
// })
// export class NotImplementedDirective {
//   constructor(el: ElementRef) { }

//   @HostListener('click') onclick(): void {
//     window.alert('二度とクリックするんじゃねぇぞハゲ');
//   }
// }


@Directive({
  selector: '[bookchainNotImplemented]'
})
export class NotImplementedDirective {
  constructor(public dialog: MatDialog) { }

  @HostListener('click') onclick(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotImplementedDialogComponent, {
    });
  }
}

@Component({
  selector: 'bookchain-not-implemented-dialog',
  template: `
  <h2 mat-dialog-title>未実装</h2>
  <mat-dialog-content>
    <p>未実装です</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">閉じる</button>
  </mat-dialog-actions>
  `
})

export class NotImplementedDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotImplementedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onclick(): void {
    this.dialogRef.close();
  }

}
