/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AddressKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.component';
import { AddressKnowmyministerService } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.service';
import { AddressKnowmyminister } from '../../../../../../main/webapp/app/entities/address-knowmyminister/address-knowmyminister.model';

describe('Component Tests', () => {

    describe('AddressKnowmyminister Management Component', () => {
        let comp: AddressKnowmyministerComponent;
        let fixture: ComponentFixture<AddressKnowmyministerComponent>;
        let service: AddressKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AddressKnowmyministerComponent],
                providers: [
                    AddressKnowmyministerService
                ]
            })
            .overrideTemplate(AddressKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AddressKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
