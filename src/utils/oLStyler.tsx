import OlStyleParser from "geostyler-openlayers-parser";

interface OLStyleInterface {
  format: string;
  style: any;
}

export function getOlStyle(styleObj: OLStyleInterface) {
  const styleFormat = styleObj.format;
  const styleConf = styleObj.style;
  let olStyle;
  switch (styleFormat) {
    case "geostyler": {
      styleObj.style.rules.forEach((rule: any) => {
        //Set default filter if no filter is found for rule
        if (!rule.filter) {
          rule = { ...rule.filter, filter: ["=="] };
        }
        //Change Symbolizers outline color from rgba to hexa
        if (rule.symbolizers?.[0].outlineColor === "rgba(0, 0, 255, 0.0)") {
          rule.symbolizers[0].outlineColor = "#0000FF00";
        }
      });
      const parser = new OlStyleParser();
      olStyle = parser.writeStyle(styleConf);
      break;
    }
    case "custom": {
      olStyle = styleConf;
      break;
    }
    default:
      break;
  }
  return olStyle;
}
