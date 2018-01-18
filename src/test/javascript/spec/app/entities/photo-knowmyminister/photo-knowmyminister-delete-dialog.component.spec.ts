/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PhotoKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister-delete-dialog.component';
import { PhotoKnowmyministerService } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.service';

describe('Component Tests', () => {

    describe('PhotoKnowmyminister Management Delete Component', () => {
        let comp: PhotoKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<PhotoKnowmyministerDeleteDialogComponent>;
        let service: PhotoKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PhotoKnowmyministerDeleteDialogComponent],
                providers: [
                    PhotoKnowmyministerService
                ]
            })
            .overrideTemplate(PhotoKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoKnowmyministerService);
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
