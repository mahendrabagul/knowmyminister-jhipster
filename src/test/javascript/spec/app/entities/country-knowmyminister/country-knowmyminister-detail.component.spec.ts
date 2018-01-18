/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { CountryKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister-detail.component';
import { CountryKnowmyministerService } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.service';
import { CountryKnowmyminister } from '../../../../../../main/webapp/app/entities/country-knowmyminister/country-knowmyminister.model';

describe('Component Tests', () => {

    describe('CountryKnowmyminister Management Detail Component', () => {
        let comp: CountryKnowmyministerDetailComponent;
        let fixture: ComponentFixture<CountryKnowmyministerDetailComponent>;
        let service: CountryKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [CountryKnowmyministerDetailComponent],
                providers: [
                    CountryKnowmyministerService
                ]
            })
            .overrideTemplate(CountryKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CountryKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
