/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { EducationKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister-delete-dialog.component';
import { EducationKnowmyministerService } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.service';

describe('Component Tests', () => {

    describe('EducationKnowmyminister Management Delete Component', () => {
        let comp: EducationKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<EducationKnowmyministerDeleteDialogComponent>;
        let service: EducationKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [EducationKnowmyministerDeleteDialogComponent],
                providers: [
                    EducationKnowmyministerService
                ]
            })
            .overrideTemplate(EducationKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationKnowmyministerService);
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
