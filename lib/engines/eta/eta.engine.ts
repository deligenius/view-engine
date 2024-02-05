import { eta } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const etaEngine: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  _filename = ""
): Promise<string> => {

  if (config.viewRoot) {
    eta.configure({ views: config.viewRoot });
  }
  return new Promise<string>((resolve, reject) => {
    try{
      const result = eta.render(template, data) as string
      resolve(result)
    }catch(e){
      reject(e)
    }
  })
};
