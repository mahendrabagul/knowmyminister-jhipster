/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { LanguageKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister-detail.component';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.service';
import { LanguageKnowmyminister } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.model';

describe('Component Tests', () => {

    describe('LanguageKnowmyminister Management Detail Component', () => {
        let comp: LanguageKnowmyministerDetailComponent;
        let fixture: ComponentFixture<LanguageKnowmyministerDetailComponent>;
        let service: LanguageKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [LanguageKnowmyministerDetailComponent],
                providers: [
                    LanguageKnowmyministerService
                ]
            })
            .overrideTemplate(LanguageKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new LanguageKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.language).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
