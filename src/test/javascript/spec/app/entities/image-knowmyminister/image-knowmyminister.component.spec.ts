/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { ImageKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.component';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.service';
import { ImageKnowmyminister } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.model';

describe('Component Tests', () => {

    describe('ImageKnowmyminister Management Component', () => {
        let comp: ImageKnowmyministerComponent;
        let fixture: ComponentFixture<ImageKnowmyministerComponent>;
        let service: ImageKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [ImageKnowmyministerComponent],
                providers: [
                    ImageKnowmyministerService
                ]
            })
            .overrideTemplate(ImageKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ImageKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.images[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
