import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalsBooksComponent } from './arrivals-books.component';

describe('ArrivalsBooksComponent', () => {
  let component: ArrivalsBooksComponent;
  let fixture: ComponentFixture<ArrivalsBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalsBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalsBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
