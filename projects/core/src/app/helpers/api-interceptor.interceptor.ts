import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../../environment';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const { language, region } = new Intl.Locale(navigator.language);
  const newReq = req.clone({
    params: req.params
      .append('api_key', environment.apiKey)
      .append('language', language)
      .append('region', region ?? 'US'),
  });
  return next(newReq);
};
