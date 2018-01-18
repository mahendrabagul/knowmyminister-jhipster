/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AddressKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister-dialog.component';
import { AddressKnowmyministerService } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.service';
import { AddressKnowmyminister } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.model';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister';
import { StateKnowmyministerService } from '../../../../../../main/webapp/app/entities/state-knowmyminister';
import { CountryKnowmyministerService } from '../../../../../../main/webapp/app/entities/country-knowmyminister';

describe('Component Tests', () => {

    describe('AddressKnowmyminister Management Dialog Component', () => {
        let comp: AddressKnowmyministerDialogComponent;
        let fixture: ComponentFixture<AddressKnowmyministerDialogComponent>;
        let service: AddressKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AddressKnowmyministerDialogComponent],
                providers: [
                    MinisterKnowmyministerService,
                    PoliticalPartyKnowmyministerService,
                    StateKnowmyministerService,
                    CountryKnowmyministerService,
                    AddressKnowmyministerService
                ]
            })
            .overrideTemplate(AddressKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
