/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { ImageKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister-detail.component';
import { ImageKnowmyministerService } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.service';
import { ImageKnowmyminister } from '../../../../../../main/webapp/app/entities/image-knowmyminister/image-knowmyminister.model';

describe('Component Tests', () => {

    describe('ImageKnowmyminister Management Detail Component', () => {
        let comp: ImageKnowmyministerDetailComponent;
        let fixture: ComponentFixture<ImageKnowmyministerDetailComponent>;
        let service: ImageKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [ImageKnowmyministerDetailComponent],
                providers: [
                    ImageKnowmyministerService
                ]
            })
            .overrideTemplate(ImageKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ImageKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.image).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
