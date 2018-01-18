/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { SocialLinkKnowmyministerDetailComponent } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister-detail.component';
import { SocialLinkKnowmyministerService } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.service';
import { SocialLinkKnowmyminister } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.model';

describe('Component Tests', () => {

    describe('SocialLinkKnowmyminister Management Detail Component', () => {
        let comp: SocialLinkKnowmyministerDetailComponent;
        let fixture: ComponentFixture<SocialLinkKnowmyministerDetailComponent>;
        let service: SocialLinkKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [SocialLinkKnowmyministerDetailComponent],
                providers: [
                    SocialLinkKnowmyministerService
                ]
            })
            .overrideTemplate(SocialLinkKnowmyministerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialLinkKnowmyministerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialLinkKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SocialLinkKnowmyminister(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.socialLink).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
