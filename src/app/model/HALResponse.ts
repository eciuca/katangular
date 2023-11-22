export function getEmbeddedField<T>(response: HALResponse<T>, fieldName: string, defaultValue: T): T {
  return response._embedded ? response._embedded[fieldName] : defaultValue;
}

export interface HALResponse<T> extends LinksResponse {
  _embedded?: EmbeddedResponse<T>;
}

export interface EmbeddedResponse<T> {
  [key: string]: T
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
