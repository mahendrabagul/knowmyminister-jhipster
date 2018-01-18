import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { WorkExperienceKnowmyminister } from './work-experience-knowmyminister.model';
import { WorkExperienceKnowmyministerService } from './work-experience-knowmyminister.service';

@Injectable()
export class WorkExperienceKnowmyministerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private workExperienceService: WorkExperienceKnowmyministerService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.workExperienceService.find(id).subscribe((workExperience) => {
                    workExperience.startDate = this.datePipe
                        .transform(workExperience.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    workExperience.endDate = this.datePipe
                        .transform(workExperience.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.workExperienceModalRef(component, workExperience);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workExperienceModalRef(component, new WorkExperienceKnowmyminister());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workExperienceModalRef(component: Component, workExperience: WorkExperienceKnowmyminister): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workExperience = workExperience;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
