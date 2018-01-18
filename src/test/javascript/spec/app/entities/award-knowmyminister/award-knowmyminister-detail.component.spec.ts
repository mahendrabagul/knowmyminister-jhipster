/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AwardKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister-detail.component';
import { AwardKnowmyministerService } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.service';
import { AwardKnowmyminister } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.model';

describe('Component Tests', () => {

    describe('AwardKnowmyminister Management Detail Component', () => {
        let comp: AwardKnowmyministerDetailComponent;
        let fixture: ComponentFixture<AwardKnowmyministerDetailComponent>;
        let service: AwardKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AwardKnowmyministerDetailComponent],
                providers: [
                    AwardKnowmyministerService
                ]
            })
            .overrideTemplate(AwardKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AwardKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.award).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
