/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { BioKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister-detail.component';
import { BioKnowmyministerService } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.service';
import { BioKnowmyminister } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.model';

describe('Component Tests', () => {

    describe('BioKnowmyminister Management Detail Component', () => {
        let comp: BioKnowmyministerDetailComponent;
        let fixture: ComponentFixture<BioKnowmyministerDetailComponent>;
        let service: BioKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [BioKnowmyministerDetailComponent],
                providers: [
                    BioKnowmyministerService
                ]
            })
            .overrideTemplate(BioKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BioKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BioKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BioKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
