/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PoliticalPartyKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister-detail.component';
import { PoliticalPartyKnowmyministerService } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.service';
import { PoliticalPartyKnowmyminister } from '../../../../../../main/webapp/app/entities/political-party-knowmyminister/political-party-knowmyminister.model';

describe('Component Tests', () => {

    describe('PoliticalPartyKnowmyminister Management Detail Component', () => {
        let comp: PoliticalPartyKnowmyministerDetailComponent;
        let fixture: ComponentFixture<PoliticalPartyKnowmyministerDetailComponent>;
        let service: PoliticalPartyKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PoliticalPartyKnowmyministerDetailComponent],
                providers: [
                    PoliticalPartyKnowmyministerService
                ]
            })
            .overrideTemplate(PoliticalPartyKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoliticalPartyKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticalPartyKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PoliticalPartyKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.politicalParty).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
