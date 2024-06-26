import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantNewComponent } from './restaurant-new.component';

describe('RestaurantNewComponent', () => {
  let component: RestaurantNewComponent;
  let fixture: ComponentFixture<RestaurantNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
