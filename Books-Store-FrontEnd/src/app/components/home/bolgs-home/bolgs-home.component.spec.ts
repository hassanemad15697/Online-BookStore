import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolgsHomeComponent } from './bolgs-home.component';

describe('BolgsHomeComponent', () => {
  let component: BolgsHomeComponent;
  let fixture: ComponentFixture<BolgsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolgsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolgsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
