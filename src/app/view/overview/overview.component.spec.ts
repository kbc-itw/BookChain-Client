import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPartsModule } from '../view-parts/view-parts.module';
import { HeaderComponent } from '../view-parts/header/header.component';
import { OverviewComponent } from './overview.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ViewPartsModule
       ],
      declarations: [ OverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('画面生成', () => {
    expect(component).toBeTruthy();
  });
});
