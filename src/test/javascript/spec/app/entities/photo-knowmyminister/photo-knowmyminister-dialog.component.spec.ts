/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PhotoKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister-dialog.component';
import { PhotoKnowmyministerService } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.service';
import { PhotoKnowmyminister } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.model';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister';

describe('Component Tests', () => {

    describe('PhotoKnowmyminister Management Dialog Component', () => {
        let comp: PhotoKnowmyministerDialogComponent;
        let fixture: ComponentFixture<PhotoKnowmyministerDialogComponent>;
        let service: PhotoKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PhotoKnowmyministerDialogComponent],
                providers: [
                    MinisterKnowmyministerService,
                    PoliticalPartyKnowmyministerService,
                    PhotoKnowmyministerService
                ]
            })
            .overrideTemplate(PhotoKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PhotoKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.photo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'photoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PhotoKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.photo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'photoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
