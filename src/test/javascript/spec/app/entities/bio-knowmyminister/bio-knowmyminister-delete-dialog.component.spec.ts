/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { BioKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister-delete-dialog.component';
import { BioKnowmyministerService } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.service';

describe('Component Tests', () => {

    describe('BioKnowmyminister Management Delete Component', () => {
        let comp: BioKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<BioKnowmyministerDeleteDialogComponent>;
        let service: BioKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [BioKnowmyministerDeleteDialogComponent],
                providers: [
                    BioKnowmyministerService
                ]
            })
            .overrideTemplate(BioKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BioKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BioKnowmyministerService);
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
