import {Component, Input, OnInit} from '@angular/core';
import {defaultOrganization, Organization} from '../../shared/model/organization';
import {UserService} from '../../shared/service/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit{

  @Input() organization: Organization = defaultOrganization;
  isUserInOrganization = false;
  @Input() isAdmin = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => this.isUserInOrganization = u.organization?.id === this.organization.id);
  }

  enterCompany(id: number | undefined): void {
    this.userService.changeCompany(id);
  }
}
