/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { EducationKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister-dialog.component';
import { EducationKnowmyministerService } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.service';
import { EducationKnowmyminister } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.model';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister';

describe('Component Tests', () => {

    describe('EducationKnowmyminister Management Dialog Component', () => {
        let comp: EducationKnowmyministerDialogComponent;
        let fixture: ComponentFixture<EducationKnowmyministerDialogComponent>;
        let service: EducationKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [EducationKnowmyministerDialogComponent],
                providers: [
                    MinisterKnowmyministerService,
                    LanguageKnowmyministerService,
                    EducationKnowmyministerService
                ]
            })
            .overrideTemplate(EducationKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EducationKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.education = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'educationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EducationKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.education = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'educationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
