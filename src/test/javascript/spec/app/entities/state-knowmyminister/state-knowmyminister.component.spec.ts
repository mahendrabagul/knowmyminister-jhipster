/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { StateKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.component';
import { StateKnowmyministerService } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.service';
import { StateKnowmyminister } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.model';

describe('Component Tests', () => {

    describe('StateKnowmyminister Management Component', () => {
        let comp: StateKnowmyministerComponent;
        let fixture: ComponentFixture<StateKnowmyministerComponent>;
        let service: StateKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [StateKnowmyministerComponent],
                providers: [
                    StateKnowmyministerService
                ]
            })
            .overrideTemplate(StateKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StateKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.states[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
