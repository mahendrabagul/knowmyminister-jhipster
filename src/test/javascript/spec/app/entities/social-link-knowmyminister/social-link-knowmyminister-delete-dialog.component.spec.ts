/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { SocialLinkKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister-delete-dialog.component';
import { SocialLinkKnowmyministerService } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.service';

describe('Component Tests', () => {

    describe('SocialLinkKnowmyminister Management Delete Component', () => {
        let comp: SocialLinkKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<SocialLinkKnowmyministerDeleteDialogComponent>;
        let service: SocialLinkKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [SocialLinkKnowmyministerDeleteDialogComponent],
                providers: [
                    SocialLinkKnowmyministerService
                ]
            })
            .overrideTemplate(SocialLinkKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialLinkKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialLinkKnowmyministerService);
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
