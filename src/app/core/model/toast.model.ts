export class ToastModel {
  id ?: any;
  title ?: string;
  message ?: string;
  duration ?: number;
  toastType ?: 'success' | 'warning' | 'error' | 'info' | 'custom' ;
  customHtml ?: string | null | undefined;
  autoClose ?: boolean|undefined;
  icon ?: string | null;
  constructor(options : {
    title ?: string,
    message ?: string,
    duration ?: number,
    toastType ?:  'success' | 'warning' | 'error' | 'info' | 'custom',
    customHtml ?: string | null | undefined,
    autoClose ?: boolean | undefined,
    icon ?: string | null
  }) {
    this.id = `${new Date().getMilliseconds()}_${Math.floor(Math.random() * 100)}`
    this.title = options.title || '';
    this.message = options.message || '';
    this.duration = options.duration || 5;
    this.autoClose = options.autoClose == undefined || options.autoClose == null  ? true : options.autoClose;
    this.toastType = options.toastType || 'success';
    this.customHtml = options.customHtml || null;
    this.icon = options.icon || null;
  }

}
