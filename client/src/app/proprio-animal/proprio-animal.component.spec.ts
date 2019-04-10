import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprioAnimalComponent } from './proprio-animal.component';

describe('ProprioAnimalComponent', () => {
  let component: ProprioAnimalComponent;
  let fixture: ComponentFixture<ProprioAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProprioAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprioAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
