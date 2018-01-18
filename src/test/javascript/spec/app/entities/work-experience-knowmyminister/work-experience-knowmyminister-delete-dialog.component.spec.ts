/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { WorkExperienceKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister-delete-dialog.component';
import { WorkExperienceKnowmyministerService } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.service';

describe('Component Tests', () => {

    describe('WorkExperienceKnowmyminister Management Delete Component', () => {
        let comp: WorkExperienceKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<WorkExperienceKnowmyministerDeleteDialogComponent>;
        let service: WorkExperienceKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [WorkExperienceKnowmyministerDeleteDialogComponent],
                providers: [
                    WorkExperienceKnowmyministerService
                ]
            })
            .overrideTemplate(WorkExperienceKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceKnowmyministerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
