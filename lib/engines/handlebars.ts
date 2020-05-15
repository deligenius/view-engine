import handlebars from "https://dev.jspm.io/handlebars@4.7.6";

export function renderHandlebars(template: string, data: object = {}): string {
  return handlebars.compile(template)(data);
}
