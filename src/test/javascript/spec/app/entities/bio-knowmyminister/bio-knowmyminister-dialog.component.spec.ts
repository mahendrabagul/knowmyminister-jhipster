/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { BioKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister-dialog.component';
import { BioKnowmyministerService } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.service';
import { BioKnowmyminister } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.model';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister';

describe('Component Tests', () => {

    describe('BioKnowmyminister Management Dialog Component', () => {
        let comp: BioKnowmyministerDialogComponent;
        let fixture: ComponentFixture<BioKnowmyministerDialogComponent>;
        let service: BioKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [BioKnowmyministerDialogComponent],
                providers: [
                    LanguageKnowmyministerService,
                    ImageKnowmyministerService,
                    BioKnowmyministerService
                ]
            })
            .overrideTemplate(BioKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BioKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BioKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BioKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BioKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
