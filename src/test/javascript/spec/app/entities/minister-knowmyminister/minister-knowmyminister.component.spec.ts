/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { MinisterKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.component';
import { MinisterKnowmyministerService } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.service';
import { MinisterKnowmyminister } from '../../../../../../main/webapp/app/entities/minister-knowmyminister/minister-knowmyminister.model';

describe('Component Tests', () => {

    describe('MinisterKnowmyminister Management Component', () => {
        let comp: MinisterKnowmyministerComponent;
        let fixture: ComponentFixture<MinisterKnowmyministerComponent>;
        let service: MinisterKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [MinisterKnowmyministerComponent],
                providers: [
                    MinisterKnowmyministerService
                ]
            })
            .overrideTemplate(MinisterKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MinisterKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinisterKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MinisterKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ministers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
