import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaTableComponent } from './idea-table.component';

describe('IdeaTableComponent', () => {
  let component: IdeaTableComponent;
  let fixture: ComponentFixture<IdeaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
