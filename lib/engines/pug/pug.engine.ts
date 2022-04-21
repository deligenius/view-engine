import { dejs } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const dejsEngine: Engine = async (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = ""
): Promise<string> => {

  return new Promise<string>(async (resolve, reject) => {
    try{
      const result = await dejs.renderToString(template, data) 
      resolve(result)
    }catch(e){
      reject(e)
    }
  })
};
