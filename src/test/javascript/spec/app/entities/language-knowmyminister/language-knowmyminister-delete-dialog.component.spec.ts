/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { LanguageKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister-delete-dialog.component';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.service';

describe('Component Tests', () => {

    describe('LanguageKnowmyminister Management Delete Component', () => {
        let comp: LanguageKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<LanguageKnowmyministerDeleteDialogComponent>;
        let service: LanguageKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [LanguageKnowmyministerDeleteDialogComponent],
                providers: [
                    LanguageKnowmyministerService
                ]
            })
            .overrideTemplate(LanguageKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageKnowmyministerService);
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
