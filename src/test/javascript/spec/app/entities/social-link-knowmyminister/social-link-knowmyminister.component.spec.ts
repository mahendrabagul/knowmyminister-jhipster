/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { KnowMyMinisterTestModule } from '../../../test.module';
import { SocialLinkKnowmyministerComponent } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.component';
import { SocialLinkKnowmyministerService } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.service';
import { SocialLinkKnowmyminister } from '../../../../../../main/webapp/app/entities/social-link-knowmyminister/social-link-knowmyminister.model';

describe('Component Tests', () => {

    describe('SocialLinkKnowmyminister Management Component', () => {
        let comp: SocialLinkKnowmyministerComponent;
        let fixture: ComponentFixture<SocialLinkKnowmyministerComponent>;
        let service: SocialLinkKnowmyministerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KnowMyMinisterTestModule],
                declarations: [SocialLinkKnowmyministerComponent],
                providers: [
                    SocialLinkKnowmyministerService
                ]
            })
            .overrideTemplate(SocialLinkKnowmyministerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocialLinkKnowmyministerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialLinkKnowmyministerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SocialLinkKnowmyminister(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.socialLinks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
