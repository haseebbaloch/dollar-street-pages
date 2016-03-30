import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {MockCommonDependency} from '../../common-mocks/mocked.services'
import {MockPhotographersService} from "./mocks/photographers.service";

import {PhotographersComponent} from '../../../app/all-photographers/photographers/photographers.component.ts';

describe("PhotographersComponent", () => {
  let mockPhotographersService = new MockPhotographersService();
  let mockCommonDependency = new MockCommonDependency();
  beforeEachProviders(() => {
    return [
      mockCommonDependency.getProviders(),
      mockPhotographersService.getProviders(),
    ];
  });
  it("PhotographersComponent must init ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhotographersComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(context.photographersByCountry.length).toBe(4);
      expect(context.photographersByName.length).toBe(4);
      expect(context.loader).toBe(true)
    })
  }));
  it("PhotographersComponent must destroy ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhotographersComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      context.ngOnDestroy();
      expect(context.photographersServiceSubscribe.isDestoyed).toBe(true);
    })
  }));
  it("PhotographersComponent must show on mobile ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhotographersComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      let nativeElement = fixture.debugElement.nativeElement;
      let searchInput = nativeElement.querySelector('.search-input');
      let sortButton = nativeElement.querySelector('.sort-country');
      expect(searchInput.classList.contains('show')).toBe(false);
      context.toggleLeftSide({target: sortButton});
      expect(searchInput.classList.contains('show')).toBe(true);
      context.toggleLeftSide({target: sortButton});
      expect(searchInput.classList.contains('show')).toBe(false);
    })
  }));
  it("PhotographersComponent must render photographers", injectAsync([TestComponentBuilder],(tcb)=> {
    return tcb.createAsync(PhotographersComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      let nativeElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      let photographerСard = nativeElement.querySelectorAll('.photographer-card');
      let countryCard = nativeElement.querySelectorAll('.country-card');
      expect(photographerСard.length).toBe(4);
      expect(countryCard.length).toBe(4);
      context.search.text = 'Igor Nepipenko';
      fixture.detectChanges();
      photographerСard = nativeElement.querySelectorAll('.photographer-card');
      countryCard = nativeElement.querySelectorAll('.country-card');
      expect(photographerСard.length).toBe(1);
      expect(countryCard.length).toBe(2);
    })
  }))
});
