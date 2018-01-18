/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { StateKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister-detail.component';
import { StateKnowmyministerService } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.service';
import { StateKnowmyminister } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.model';

describe('Component Tests', () => {

    describe('StateKnowmyminister Management Detail Component', () => {
        let comp: StateKnowmyministerDetailComponent;
        let fixture: ComponentFixture<StateKnowmyministerDetailComponent>;
        let service: StateKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [StateKnowmyministerDetailComponent],
                providers: [
                    StateKnowmyministerService
                ]
            })
            .overrideTemplate(StateKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StateKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.state).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
