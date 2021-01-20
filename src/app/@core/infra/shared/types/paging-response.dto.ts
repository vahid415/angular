export class PageResponse<E> {
  constructor(public totalPages: number,
              public totalElements: number,
              public content: E[]) {
  }

  // remove the passed element from the content array.
  remove(element: E) {
    const indexToRemove: number = this.content.indexOf(element);
    this.content = this.content.filter((val, i) => i !== indexToRemove);
    this.totalElements = this.totalElements - 1;
  }

  add(element: E) {
    this.content.push(element);
    this.totalElements = this.totalElements + 1;
  }

  getPage(skip, take) {
    return this.content.slice(skip, take);
  }
}