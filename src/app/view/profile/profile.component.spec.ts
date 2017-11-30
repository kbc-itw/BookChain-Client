import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('インスタンス生成', () => {
    expect(component).toBeTruthy();
  });

  it('ユーザーのダミーを取得できているかのテスト', () => {
    expect(component.getUser).toEqual({
      locator: "huruikagi@kbc-itw.net",
      host: "kbc-itw.net",
      id: "huruikagi",
      name: "ふるいかぎ"
    });
  });
});
