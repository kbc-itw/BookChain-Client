import { TestBed, inject } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NotImplementedDirective} from './not-implemented.directive';

describe('NotImplementedDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [NotImplementedDirective]
    });
  });

  it('生成', inject([NotImplementedDirective], (directive: NotImplementedDirective) => {
    expect(directive).toBeTruthy();
  }));
});
