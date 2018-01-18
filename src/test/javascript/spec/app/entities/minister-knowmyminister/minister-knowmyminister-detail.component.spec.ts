/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { MinisterKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister-detail.component';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.service';
import { MinisterKnowmyminister } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.model';

describe('Component Tests', () => {

    describe('MinisterKnowmyminister Management Detail Component', () => {
        let comp: MinisterKnowmyministerDetailComponent;
        let fixture: ComponentFixture<MinisterKnowmyministerDetailComponent>;
        let service: MinisterKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [MinisterKnowmyministerDetailComponent],
                providers: [
                    MinisterKnowmyministerService
                ]
            })
            .overrideTemplate(MinisterKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MinisterKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinisterKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MinisterKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.minister).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
