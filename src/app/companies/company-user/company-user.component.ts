import {Component, Input, OnInit} from '@angular/core';
import {defaultOrganization, Organization} from '../../shared/model/organization';
import {UserService} from '../../shared/service/user.sevice';

@Component({
  selector: 'app-company-user',
  templateUrl: './company-user.component.html',
  styleUrls: ['./company-user.component.scss']
})
export class CompanyUserComponent implements OnInit{

  @Input() organization: Organization = defaultOrganization;
  isUserInOrganization = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => this.isUserInOrganization = u.organization?.id === this.organization.id);
  }

  enterCompany(id: number | undefined): void {
    this.userService.changeCompany(id);
  }
}
