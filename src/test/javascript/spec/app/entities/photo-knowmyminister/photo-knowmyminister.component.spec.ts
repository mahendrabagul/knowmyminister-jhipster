/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PhotoKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.component';
import { PhotoKnowmyministerService } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.service';
import { PhotoKnowmyminister } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.model';

describe('Component Tests', () => {

    describe('PhotoKnowmyminister Management Component', () => {
        let comp: PhotoKnowmyministerComponent;
        let fixture: ComponentFixture<PhotoKnowmyministerComponent>;
        let service: PhotoKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PhotoKnowmyministerComponent],
                providers: [
                    PhotoKnowmyministerService
                ]
            })
            .overrideTemplate(PhotoKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PhotoKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.photos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
