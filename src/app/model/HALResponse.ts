
export interface HALResponse<T> extends LinksResponse {
  _embedded?: T[];
}

export interface LinksResponse {
  _links: Links;
}

interface Links {
  [key: string]: Link
  _self: Link
}

interface Link {
  href: string
}
