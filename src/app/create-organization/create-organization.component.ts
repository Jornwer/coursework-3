import { Component } from '@angular/core';
import {OrganizationService} from '../shared/service/organization.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizationPayload} from '../shared/payload/organization.payload';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent{

  form: FormGroup;
  isError = false;

  constructor(private organizationService: OrganizationService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.pattern('[a-zA-Zа-яА-Я\\s\\d]{2,30}'), Validators.required]),
      type: new FormControl('', [Validators.pattern('[a-zA-Zа-яА-Я\\s]{2,30}'), Validators.required])
    });
  }

  submit(): void {
    const payload: OrganizationPayload = {
      name: this.form.get('name')?.value,
      type: this.form.get('type')?.value
    };
    this.organizationService.createOrganization(payload).subscribe(() => {
      this.isError = false;
      this.router.navigateByUrl('/');
    }, () => this.isError = true);
  }
}
