/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { AwardKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.component';
import { AwardKnowmyministerService } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.service';
import { AwardKnowmyminister } from '../../../../../../main/webapp/app/entities/award-knowmyminister/award-knowmyminister.model';

describe('Component Tests', () => {

    describe('AwardKnowmyminister Management Component', () => {
        let comp: AwardKnowmyministerComponent;
        let fixture: ComponentFixture<AwardKnowmyministerComponent>;
        let service: AwardKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [AwardKnowmyministerComponent],
                providers: [
                    AwardKnowmyministerService
                ]
            })
            .overrideTemplate(AwardKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AwardKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.awards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
