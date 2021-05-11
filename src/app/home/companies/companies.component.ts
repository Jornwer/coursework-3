import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/service/user.sevice';
import {Organization} from '../../shared/model/organization';
import {OrganizationService} from '../../shared/service/organization.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit{

  isAdmin = false;
  organizations: Organization[] = new Array<Organization>();

  constructor(private userService: UserService, private organizationService: OrganizationService) {
    userService.user.subscribe(u => this.isAdmin = u.role === 'ADMIN');
  }

  ngOnInit(): void {
    this.organizationService.getAllOrganizations().subscribe(data => this.organizations = data);
  }
}


