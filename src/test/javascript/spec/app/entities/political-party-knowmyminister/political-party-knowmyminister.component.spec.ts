/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PoliticalPartyKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.component';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.service';
import { PoliticalPartyKnowmyminister } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.model';

describe('Component Tests', () => {

    describe('PoliticalPartyKnowmyminister Management Component', () => {
        let comp: PoliticalPartyKnowmyministerComponent;
        let fixture: ComponentFixture<PoliticalPartyKnowmyministerComponent>;
        let service: PoliticalPartyKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PoliticalPartyKnowmyministerComponent],
                providers: [
                    PoliticalPartyKnowmyministerService
                ]
            })
            .overrideTemplate(PoliticalPartyKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoliticalPartyKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticalPartyKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PoliticalPartyKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.politicalParties[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
