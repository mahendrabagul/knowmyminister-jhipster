/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { MinisterKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister-dialog.component';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.service';
import { MinisterKnowmyminister } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.model';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister';
import { BioKnowmyministerService } from '../../../../../../main/webapp/app/entities/bio-knowmyminister';

describe('Component Tests', () => {

    describe('MinisterKnowmyminister Management Dialog Component', () => {
        let comp: MinisterKnowmyministerDialogComponent;
        let fixture: ComponentFixture<MinisterKnowmyministerDialogComponent>;
        let service: MinisterKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [MinisterKnowmyministerDialogComponent],
                providers: [
                    ImageKnowmyministerService,
                    PoliticalPartyKnowmyministerService,
                    BioKnowmyministerService,
                    MinisterKnowmyministerService
                ]
            })
            .overrideTemplate(MinisterKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MinisterKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinisterKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MinisterKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.minister = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ministerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MinisterKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.minister = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ministerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
