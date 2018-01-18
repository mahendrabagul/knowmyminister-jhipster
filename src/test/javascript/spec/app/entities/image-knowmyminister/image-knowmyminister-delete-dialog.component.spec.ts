/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { ImageKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister-delete-dialog.component';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.service';

describe('Component Tests', () => {

    describe('ImageKnowmyminister Management Delete Component', () => {
        let comp: ImageKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<ImageKnowmyministerDeleteDialogComponent>;
        let service: ImageKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [ImageKnowmyministerDeleteDialogComponent],
                providers: [
                    ImageKnowmyministerService
                ]
            })
            .overrideTemplate(ImageKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageKnowmyministerService);
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
