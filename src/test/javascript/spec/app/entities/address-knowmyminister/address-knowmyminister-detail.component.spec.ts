/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AddressKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister-detail.component';
import { AddressKnowmyministerService } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.service';
import { AddressKnowmyminister } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.model';

describe('Component Tests', () => {

    describe('AddressKnowmyminister Management Detail Component', () => {
        let comp: AddressKnowmyministerDetailComponent;
        let fixture: ComponentFixture<AddressKnowmyministerDetailComponent>;
        let service: AddressKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AddressKnowmyministerDetailComponent],
                providers: [
                    AddressKnowmyministerService
                ]
            })
            .overrideTemplate(AddressKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AddressKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
