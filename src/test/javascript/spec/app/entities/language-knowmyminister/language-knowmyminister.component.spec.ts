/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { LanguageKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.component';
import { LanguageKnowmyministerService } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.service';
import { LanguageKnowmyminister } from '../../../../../../main/webapp/app/entities/language-knowmyminister/language-knowmyminister.model';

describe('Component Tests', () => {

    describe('LanguageKnowmyminister Management Component', () => {
        let comp: LanguageKnowmyministerComponent;
        let fixture: ComponentFixture<LanguageKnowmyministerComponent>;
        let service: LanguageKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [LanguageKnowmyministerComponent],
                providers: [
                    LanguageKnowmyministerService
                ]
            })
            .overrideTemplate(LanguageKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new LanguageKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.languages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
