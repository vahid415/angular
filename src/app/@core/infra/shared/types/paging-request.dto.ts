import {Filter} from "./filter.dto";
import {GridSort} from "./sort.dto";

export class PagingRequest {
  start: number;
  size: number;
  filters = new Array<Filter>();
  sort: GridSort;

  constructor(start?: number, size?: number, filters?: Filter[], sort?: GridSort) {
    this.start = start;
    this.size = size;
    this.filters = filters ? filters : new Array<Filter>();
    this.sort = sort;
  }
}

export class ClientSearchParameters {
  take: string;
  skip: string;
  dataField: string;
  sort: Sort[] = [];
  requireTotalCount: string;
  parentIds: any = [];
  params: SearchParams[] = [];
  searchLevelType: any;
  constructor() {
  }
}

export class Sort {
  selector: string;
  desc: string;

  constructor(selector: string, desc: string) {
    this.selector = selector;
    this.desc = desc;
  }
}

export class SearchParams {
  fieldName: string;
  operator: string;
  value: object;
  constructor(fieldName: string,
  operator: string,
  value: object) {
    this.fieldName = fieldName;
    this.operator = operator;
    this.value = value;
  }
}

export class PageRequestByExample<E> {
  constructor(public example: E,
              public clientSearchParameters: ClientSearchParameters) {
  }
}