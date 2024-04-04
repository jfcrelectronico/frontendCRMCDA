import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerusuarioComponent } from './verusuario.component';

describe('VerusuarioComponent', () => {
  let component: VerusuarioComponent;
  let fixture: ComponentFixture<VerusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
