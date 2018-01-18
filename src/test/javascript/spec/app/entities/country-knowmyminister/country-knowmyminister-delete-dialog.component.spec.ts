/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { CountryKnowmyministerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister-delete-dialog.component';
import { CountryKnowmyministerService } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.service';

describe('Component Tests', () => {

    describe('CountryKnowmyminister Management Delete Component', () => {
        let comp: CountryKnowmyministerDeleteDialogComponent;
        let fixture: ComponentFixture<CountryKnowmyministerDeleteDialogComponent>;
        let service: CountryKnowmyministerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [CountryKnowmyministerDeleteDialogComponent],
                providers: [
                    CountryKnowmyministerService
                ]
            })
            .overrideTemplate(CountryKnowmyministerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryKnowmyministerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryKnowmyministerService);
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
