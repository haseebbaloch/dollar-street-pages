import { Component, ViewEncapsulation, Inject, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscriber } from 'rxjs/Rx';
import { SocialShareButtonsComponent } from '../social_share_buttons/social-share-buttons.component.ts';
import { Angulartics2On } from 'angulartics2';

let tpl = require('./footer.template.html');
let style = require('./footer.css');

@Component({
  selector: 'footer',
  template: tpl,
  styles: [style],
  directives: [ROUTER_DIRECTIVES, SocialShareButtonsComponent, Angulartics2On],
  encapsulation: ViewEncapsulation.None
})

export class FooterComponent implements OnInit, OnDestroy {
  protected footerData: any = {};
  private footerService: any;
  private footerServiceSubscribe: Subscriber<any>;

  public constructor(@Inject('FooterService') footerService: any) {
    this.footerService = footerService;
  }

  public ngOnInit(): any {
    this.footerServiceSubscribe = this.footerService.getFooter()
      .subscribe((val: any) => {
        if (val.err) {
          console.error(val.err);
          return;
        }

        this.footerData = val.data;
      });
  }

  public ngOnDestroy(): void {
    this.footerServiceSubscribe.unsubscribe();
  }
}
