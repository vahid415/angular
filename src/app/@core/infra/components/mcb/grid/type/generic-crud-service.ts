import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ClientSearchParameters, PageRequestByExample, PageResponse } from 'app/@core/public-api';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudOperations } from './crud-operations.interface';


export abstract class GenericCrudService implements CrudOperations {
  getMembershipTypes(): any {
    throw new Error('Method not implemented.');
  }

  public firstLoad: boolean = true;
  // basic search criterias (visible if not in 'sub' mode)
  example: any;
  EntityType: any;
  protected base: string;

  constructor(base: string,
    public http: HttpClient,
    EntityType: {
      new(res?): any;
    }) {
    this.EntityType = EntityType;
    this.example = new EntityType();
    this.base = base;
  }

  /**
   * Create the passed entity.
   */
  save(entity: any) {
    const body = entity;
    return this.http.post('/api/' + this.base + '/', body);
  }

  /**
   * Update the passed entity.
   */
  update(entity: any, key: any): Observable<any> {
    const body = entity;
    return this.http.put('/api/' + this.base + '/', body);
  }

  /**
   * Get a entity by id.
   */
  findOne(id: any): Observable<any> {
    return this.http.get<any>('/api/' + this.base + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Load a page (for paginated datatable) of EntityType using the passed
   * entity as an example for the search by example facility.
   */
  getPage(params: HttpParams, sp: ClientSearchParameters): Observable<PageResponse<any>> {
    const req = new PageRequestByExample(this.example, sp);
    const body = req;
    return this.http.post<PageResponse<any>>('/api/' + this.base + '/page', body, { params: params });
  }

  /**
   * Load distinct values using the passed
   * GridFilter dao field.
   */
  getDistinctValues(dataField: any): Observable<any> {
    const sp: ClientSearchParameters = new ClientSearchParameters();
    sp.dataField = dataField;
    const req = new PageRequestByExample({}, sp);
    const body = req;

    return this.http.post<any>('/api/' + this.base + '/distinct', body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Performs a search by example on 1 attribute (defined on server side) and returns at most 10 results.
   */
  complete(query: string): Observable<any[]> {
    const body = { 'query': query, 'maxResults': 10 };
    return this.http.post<any[]>('/api/' + this.base + '/complete', body);
  }

  /**
   * Delete an entity by id.
   */
  delete(id: any, entity: any) {
    return this.http.delete('/api/' + this.base + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete an entity by id.
   */
  listAll(): any {
    return this.http.get('/api/' + this.base + '/listAll')
      .pipe(
        catchError(this.handleError)
      );
  }

  // sample method from angular doc
  handleError(error: HttpErrorResponse) {
    // TODO: seems we cannot use messageService from here...
    let msg: string;
    if (error instanceof Response) {
      // msg = error.json() || '';
    } else {
      msg = error.message ? error.message : error.toString();
    }
    console.error(msg);
    if (error.status === 401) {
      window.location.href = '/';
    }
    return Observable.throw(msg);
  }

  toString(example: any): any {
    return example[ 'title' ];
  }
}
