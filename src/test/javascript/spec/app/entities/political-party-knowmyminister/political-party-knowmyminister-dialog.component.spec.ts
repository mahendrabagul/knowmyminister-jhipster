/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PoliticalPartyKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister-dialog.component';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.service';
import { PoliticalPartyKnowmyminister } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.model';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister';

describe('Component Tests', () => {

    describe('PoliticalPartyKnowmyminister Management Dialog Component', () => {
        let comp: PoliticalPartyKnowmyministerDialogComponent;
        let fixture: ComponentFixture<PoliticalPartyKnowmyministerDialogComponent>;
        let service: PoliticalPartyKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PoliticalPartyKnowmyministerDialogComponent],
                providers: [
                    ImageKnowmyministerService,
                    MinisterKnowmyministerService,
                    PoliticalPartyKnowmyministerService
                ]
            })
            .overrideTemplate(PoliticalPartyKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoliticalPartyKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticalPartyKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PoliticalPartyKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.politicalParty = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'politicalPartyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PoliticalPartyKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.politicalParty = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'politicalPartyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
