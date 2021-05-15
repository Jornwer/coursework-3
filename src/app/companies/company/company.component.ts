import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() enterEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => this.isUserInOrganization = u.organization?.id === this.organization.id);
  }

  enterCompany(id: number | undefined): void {
    if (id === undefined) {
      this.organization.employeeCount--;
    } else {
      this.organization.employeeCount++;
    }
    this.userService.changeCompany(id);
  }
}
