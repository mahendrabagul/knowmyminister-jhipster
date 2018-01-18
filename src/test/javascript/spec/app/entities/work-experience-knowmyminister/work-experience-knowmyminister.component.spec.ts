/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { WorkExperienceKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.component';
import { WorkExperienceKnowmyministerService } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.service';
import { WorkExperienceKnowmyminister } from '../../../../../../main/webapp/app/entities/work-experience-knowmyminister/work-experience-knowmyminister.model';

describe('Component Tests', () => {

    describe('WorkExperienceKnowmyminister Management Component', () => {
        let comp: WorkExperienceKnowmyministerComponent;
        let fixture: ComponentFixture<WorkExperienceKnowmyministerComponent>;
        let service: WorkExperienceKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [WorkExperienceKnowmyministerComponent],
                providers: [
                    WorkExperienceKnowmyministerService
                ]
            })
            .overrideTemplate(WorkExperienceKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WorkExperienceKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workExperiences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
