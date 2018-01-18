/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { CountryKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.component';
import { CountryKnowmyministerService } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.service';
import { CountryKnowmyminister } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.model';

describe('Component Tests', () => {

    describe('CountryKnowmyminister Management Component', () => {
        let comp: CountryKnowmyministerComponent;
        let fixture: ComponentFixture<CountryKnowmyministerComponent>;
        let service: CountryKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [CountryKnowmyministerComponent],
                providers: [
                    CountryKnowmyministerService
                ]
            })
            .overrideTemplate(CountryKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CountryKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
