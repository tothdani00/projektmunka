import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMutatasComponent } from './post-mutatas.component';

describe('PostMutatasComponent', () => {
  let component: PostMutatasComponent;
  let fixture: ComponentFixture<PostMutatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMutatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMutatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
