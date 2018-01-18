/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { BioKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.component';
import { BioKnowmyministerService } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.service';
import { BioKnowmyminister } from '../../../../../../main/webapp/app/entities/bio-knowmyminister/bio-knowmyminister.model';

describe('Component Tests', () => {

    describe('BioKnowmyminister Management Component', () => {
        let comp: BioKnowmyministerComponent;
        let fixture: ComponentFixture<BioKnowmyministerComponent>;
        let service: BioKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [BioKnowmyministerComponent],
                providers: [
                    BioKnowmyministerService
                ]
            })
            .overrideTemplate(BioKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BioKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BioKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BioKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
