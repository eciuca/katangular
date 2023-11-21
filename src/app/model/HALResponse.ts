export interface HALResponse<T> {
  _embedded: T[];
  _links: Links;
}

interface Links {
  [key: string]: Link
  _self: Link
}

interface Link {
  href: string
}
