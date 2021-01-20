import {HttpParams} from '@angular/common/http';
import { ClientSearchParameters, PageResponse } from 'app/@core/public-api';
import { Observable } from 'rxjs';

export interface CrudOperations {
  save(t: any): Observable<any>;

  update(t: any, id: any): Observable<any>;

  findOne(id: any): Observable<any>;

  getPage(params: HttpParams, sp: ClientSearchParameters): Observable<PageResponse<any>>;

  complete(query: string): Observable<any[]>;

  delete(id: any, entity: any): Observable<any>;
}
