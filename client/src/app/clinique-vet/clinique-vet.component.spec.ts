import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniqueVetComponent } from './clinique-vet.component';

describe('CliniqueVetComponent', () => {
  let component: CliniqueVetComponent;
  let fixture: ComponentFixture<CliniqueVetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliniqueVetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliniqueVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
