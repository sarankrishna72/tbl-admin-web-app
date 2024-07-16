import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IndexedDbService } from '../../../shared/services/storage/indexed-db.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { APP_PAGES_PATH } from '../../constants/application_paths';

export const authGuard: CanActivateFn = async (route, state) : Promise<boolean | any> =>  {
  const _indexedDbService = inject(IndexedDbService);
  const _router = inject(Router);
  const _toastService = inject(ToastService);
  let data;
  data =  await _indexedDbService.getItem("token");
  if (!data) {
    _toastService.error({title: "Access denied!", message: "User authentication failed. Please try again..", autoClose: true, duration: 3})
    _router.navigate([APP_PAGES_PATH.ROOT_PATH]);
    return false;
  }
  return true;
};



export const signInAuthGuard: CanActivateFn = async (route, state) : Promise<boolean | any> =>  {
  const _indexedDbService = inject(IndexedDbService);
  const _router = inject(Router);
  try {
    const data = await _indexedDbService.getItem("token");
    if (data) {
      _router.navigate([APP_PAGES_PATH.OUTLETS_PATH]);
      return false;
    }
  } catch (error) {
    return true;
  }

  return true;
};
