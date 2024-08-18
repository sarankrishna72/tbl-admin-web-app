import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierSignInComponent } from './cashier-sign-in.component';

describe('CashierSignInComponent', () => {
  let component: CashierSignInComponent;
  let fixture: ComponentFixture<CashierSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierSignInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashierSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
