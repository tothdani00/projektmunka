import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostKeszitesComponent } from './post-keszites.component';

describe('PostKeszitesComponent', () => {
  let component: PostKeszitesComponent;
  let fixture: ComponentFixture<PostKeszitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostKeszitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostKeszitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
