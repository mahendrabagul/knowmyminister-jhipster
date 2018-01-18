/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { StateKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister-dialog.component';
import { StateKnowmyministerService } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.service';
import { StateKnowmyminister } from '../../../../../../main/webapp/app/entities/state-knowmyminister/state-knowmyminister.model';
import { CountryKnowmyministerService } from '../../../../../../main/webapp/app/entities/country-knowmyminister';

describe('Component Tests', () => {

    describe('StateKnowmyminister Management Dialog Component', () => {
        let comp: StateKnowmyministerDialogComponent;
        let fixture: ComponentFixture<StateKnowmyministerDialogComponent>;
        let service: StateKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [StateKnowmyministerDialogComponent],
                providers: [
                    CountryKnowmyministerService,
                    StateKnowmyministerService
                ]
            })
            .overrideTemplate(StateKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.state = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.state = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
