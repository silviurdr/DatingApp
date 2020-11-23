import { AccountService } from './../_services/account.service';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  user: User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
    private acccountService: AccountService) {
      this.acccountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
    }

}
