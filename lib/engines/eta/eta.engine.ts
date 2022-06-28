import { eta } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const etaEngine: Engine = async (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = ""
): Promise<string> => {

  if (config.viewRoot) {
    eta.configure({ views: config.viewRoot });
  }

  return new Promise<string>(async (resolve, reject) => {
    try{
      const result = await eta.render( template, data) as string
      resolve(result)
    }catch(e){
      reject(e)
    }
  })
};
