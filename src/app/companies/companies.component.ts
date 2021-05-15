import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {Organization} from '../shared/model/organization';
import {OrganizationService} from '../shared/service/organization.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit{

  isAdmin = false;
  organizations: Organization[] = new Array<Organization>();
  inOrganization = false;
  currentOrganization: number | undefined;

  constructor(private userService: UserService, private organizationService: OrganizationService) {
    userService.user.subscribe(u => this.isAdmin = u.role === 'ADMIN');
    userService.inOrganization.subscribe(is => this.inOrganization = is);
    userService.user.subscribe(u => this.currentOrganization = u.organization?.id);
  }

  ngOnInit(): void {
    this.organizationService.getAllOrganizations().subscribe(data => this.organizations = data);
  }

  changeNumberOfEmployees(): void {
    this.organizations
      .filter(org => org.id === this.currentOrganization)
      .forEach(org => org.employeeCount--);
  }

  deleteCompany(id: number): void {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      console.log(id);
      this.organizations = this.organizations
        .filter(org => org.id !== id);
    });
  }
}


