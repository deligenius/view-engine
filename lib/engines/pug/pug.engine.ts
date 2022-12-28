import { path, pug } from "../../../deps.ts";
import { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const pugEngine: Engine = async (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename = ""
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      const result = pug.render(template, {
        filename: path.join(config.viewRoot || "", filename),
        cache: true,
        ...data,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};
