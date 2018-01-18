/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AwardKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister-delete-dialog.component';
import { AwardKnowmyministerService } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.service';

describe('Component Tests', () => {

    describe('AwardKnowmyminister Management Delete Component', () => {
        let comp: AwardKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<AwardKnowmyministerDeleteDialogComponent>;
        let service: AwardKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AwardKnowmyministerDeleteDialogComponent],
                providers: [
                    AwardKnowmyministerService
                ]
            })
            .overrideTemplate(AwardKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardKnowmyministerService);
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
