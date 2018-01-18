/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { LanguageKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister-dialog.component';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.service';
import { LanguageKnowmyminister } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.model';

describe('Component Tests', () => {

    describe('LanguageKnowmyminister Management Dialog Component', () => {
        let comp: LanguageKnowmyministerDialogComponent;
        let fixture: ComponentFixture<LanguageKnowmyministerDialogComponent>;
        let service: LanguageKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [LanguageKnowmyministerDialogComponent],
                providers: [
                    LanguageKnowmyministerService
                ]
            })
            .overrideTemplate(LanguageKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
