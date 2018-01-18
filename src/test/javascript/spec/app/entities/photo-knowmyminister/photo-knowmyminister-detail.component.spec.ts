/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { PhotoKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister-detail.component';
import { PhotoKnowmyministerService } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.service';
import { PhotoKnowmyminister } from '../../../../../../main/webapp/app/entities/photo-knowmyminister/photo-knowmyminister.model';

describe('Component Tests', () => {

    describe('PhotoKnowmyminister Management Detail Component', () => {
        let comp: PhotoKnowmyministerDetailComponent;
        let fixture: ComponentFixture<PhotoKnowmyministerDetailComponent>;
        let service: PhotoKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [PhotoKnowmyministerDetailComponent],
                providers: [
                    PhotoKnowmyministerService
                ]
            })
            .overrideTemplate(PhotoKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PhotoKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.photo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
