import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarclientesComponent } from './ingresarclientes.component';

describe('IngresarclientesComponent', () => {
  let component: IngresarclientesComponent;
  let fixture: ComponentFixture<IngresarclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarclientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresarclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
