/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { WorkExperienceKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister-detail.component';
import { WorkExperienceKnowmyministerService } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.service';
import { WorkExperienceKnowmyminister } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.model';

describe('Component Tests', () => {

    describe('WorkExperienceKnowmyminister Management Detail Component', () => {
        let comp: WorkExperienceKnowmyministerDetailComponent;
        let fixture: ComponentFixture<WorkExperienceKnowmyministerDetailComponent>;
        let service: WorkExperienceKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [WorkExperienceKnowmyministerDetailComponent],
                providers: [
                    WorkExperienceKnowmyministerService
                ]
            })
            .overrideTemplate(WorkExperienceKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WorkExperienceKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workExperience).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
