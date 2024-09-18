import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpService } from '../../shared/services/http/http.service';
import { CommonService } from '../../shared/services/common/common.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppStoreService } from '../../shared/services/store/app-store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { OutletPageData } from '../../core/configurations/pages/outlet';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let commonService: CommonService;
  let router: Router;
  let routerEventsSubject: Subject<any>;
  let toastService: jasmine.SpyObj<ToastService>;
  let appStoreService: jasmine.SpyObj<AppStoreService>;
  let httpMock: any;
  let httpService: any;
  beforeEach(async () => {
     routerEventsSubject = new Subject<any>();
    const commonServiceSpy = jasmine.createSpyObj('CommonService', ['getPageConfiguration']);
    toastService = jasmine.createSpyObj('ToastService', ['success']);
    appStoreService = jasmine.createSpyObj('AppStoreService', ['closePopup', 'getPopupShowing']);
    appStoreService = jasmine.createSpyObj('AppStoreService', ['closePopup', 'getPopupShowing']);
    httpService =  jasmine.createSpyObj('AppStoreService', ['get', 'put', 'post', 'delete']);
    await TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
      providers: [
        HttpClient,
        { provide: HttpService, useValue: httpService },
        { provide: CommonService, useValue: commonServiceSpy },
        { provide: ToastService, useValue: toastService },
        { provide: AppStoreService, useValue: appStoreService },
        { provide: Router, useValue: { events: routerEventsSubject.asObservable() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    router = TestBed.inject(Router);
    commonService = TestBed.inject(CommonService);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPageConfiguration() on NavigationEnd event', () => {
    const navigationEndEvent = new NavigationEnd(1, '/home', '/home');
    component.changeRouterEvent(); // Subscribe to router events
    routerEventsSubject.next(navigationEndEvent);
    expect(commonService.getPageConfiguration).toHaveBeenCalled();
  });

  it('should submit new form data when selectedData is undefined', () => {
    component.selectedData = undefined;
    component.configurations = OutletPageData;

    const event = {
      action: 'submit',
      value: { name: 'John', file: new File([''], 'test.txt') }
    };
    spyOn(component, 'getApi').and.returnValue(of({
      message: 'Created successfully!',
      data: { id: 1, name: 'John' }
    }));

    component.onSubmit(event)
    expect(component.getApi).toHaveBeenCalledWith(component.configurations.create_api, jasmine.any(FormData))
  });

  it('should submit new form data when selectedData is present', () => {
    component.selectedData = {id: 1};
    component.configurations = OutletPageData;
    const event = {
      action: 'submit',
      value: { name: 'John', file: new File([''], 'test.txt') }
    };
    spyOn(component, 'getApi').and.returnValue(of({
      message: 'Updated successfully!',
      data: { id: 1, name: 'John' }
    }));

    component.onSubmit(event)
    expect(component.getApi).toHaveBeenCalledWith(component.configurations.update_api, jasmine.any(FormData))

  });

  it('should call GET method with correct URL', () => {
    const api = { method: 'get', url: 'api/resource' };
    const data = {}
    const res = component.getApi(api, data)
    expect(res).toBe(component._httpService.get('api/resource'))
  });

  it('should call POST method with correct URL', () => {
    const api = { method: 'post', url: 'api/resource' };
    const data = {}
    const res = component.getApi(api, data)
    expect(res).toBe(component._httpService.post('api/resource', data))
  });

  it('should call PUT method with correct URL', () => {
    component.selectedData = {id: 2}
    const api = { method: 'put', url: 'api/resource/{id}' };
    const data = {}
    const res = component.getApi(api, data)
    expect(res).toBe(component._httpService.put('api/resource/2', data))
  });

  it('should call DELETE method with correct URL', () => {
    component.selectedData = { id: 2 }
    const api = { method: 'delete', url: 'api/resource/{id}' };
    const data = {}
    const res = component.getApi(api, data)
    expect(res).toBe(component._httpService.delete('api/resource/2', data))
  });

  it('should call Default method with correct URL', () => {
    component.selectedData = {id: 2}
    const api = { method: 'default', url: 'api/resource' };
    const data = {}
    const res = component.getApi(api, data)
    expect(res).toBe(component._httpService.get('api/resource'))
  });

  it('should call generateList', () => {
    component.configurations = OutletPageData;
    const res = component.getApi(component.configurations.list_api, {})
    expect(res).toBe(component._httpService.get(OutletPageData.list_api!.url))

  });

});
