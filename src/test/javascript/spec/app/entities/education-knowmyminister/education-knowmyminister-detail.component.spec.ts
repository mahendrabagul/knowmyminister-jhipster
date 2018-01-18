/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { EducationKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister-detail.component';
import { EducationKnowmyministerService } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.service';
import { EducationKnowmyminister } from '../../../../../../main/webapp/app/entities/education-knowmyminister/education-knowmyminister.model';

describe('Component Tests', () => {

    describe('EducationKnowmyminister Management Detail Component', () => {
        let comp: EducationKnowmyministerDetailComponent;
        let fixture: ComponentFixture<EducationKnowmyministerDetailComponent>;
        let service: EducationKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [EducationKnowmyministerDetailComponent],
                providers: [
                    EducationKnowmyministerService
                ]
            })
            .overrideTemplate(EducationKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EducationKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.education).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
