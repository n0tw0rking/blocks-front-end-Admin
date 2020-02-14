import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksPageComponent } from './blocks-page.component';

describe('BlocksPageComponent', () => {
  let component: BlocksPageComponent;
  let fixture: ComponentFixture<BlocksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
