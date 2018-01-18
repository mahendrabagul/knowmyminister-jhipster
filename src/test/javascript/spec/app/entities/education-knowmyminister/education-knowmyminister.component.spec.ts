/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { EducationKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.component';
import { EducationKnowmyministerService } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.service';
import { EducationKnowmyminister } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.model';

describe('Component Tests', () => {

    describe('EducationKnowmyminister Management Component', () => {
        let comp: EducationKnowmyministerComponent;
        let fixture: ComponentFixture<EducationKnowmyministerComponent>;
        let service: EducationKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [EducationKnowmyministerComponent],
                providers: [
                    EducationKnowmyministerService
                ]
            })
            .overrideTemplate(EducationKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EducationKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.educations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
