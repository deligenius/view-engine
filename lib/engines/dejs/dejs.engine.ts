import { dejs } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const dejsEngine: Engine = (
  template: string,
  data: object = {},
  _config: ViewConfig = {},
  _filename = ""
): Promise<string> => {

  return new Promise<string>( (resolve, reject) => {
    try{
      const result = dejs.renderToString(template, data) 
      resolve(result)
    }catch(e){
      reject(e)
    }
  })
};
