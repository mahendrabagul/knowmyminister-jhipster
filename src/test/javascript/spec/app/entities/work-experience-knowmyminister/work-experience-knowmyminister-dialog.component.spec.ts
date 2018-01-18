/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { WorkExperienceKnowmyministerDialogComponent } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister-dialog.component';
import { WorkExperienceKnowmyministerService } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.service';
import { WorkExperienceKnowmyminister } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.model';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister';

describe('Component Tests', () => {

    describe('WorkExperienceKnowmyminister Management Dialog Component', () => {
        let comp: WorkExperienceKnowmyministerDialogComponent;
        let fixture: ComponentFixture<WorkExperienceKnowmyministerDialogComponent>;
        let service: WorkExperienceKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [WorkExperienceKnowmyministerDialogComponent],
                providers: [
                    MinisterKnowmyministerService,
                    LanguageKnowmyministerService,
                    WorkExperienceKnowmyministerService
                ]
            })
            .overrideTemplate(WorkExperienceKnowmyministerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceKnowmyministerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkExperienceKnowmyminister(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.workExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkExperienceKnowmyminister();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.workExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
