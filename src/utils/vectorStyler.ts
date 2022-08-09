import { getOlStyle } from "@utils";

interface VectorStylerInterface {
  layer: any;
  lConf: {
    style: any;
    name: string;
  };
}

export function styleVectorLayer(props: VectorStylerInterface) {
  // Style the vector tile layer
  let styleObj: { format: string; style: any };
  if (typeof props.lConf.style === "object") {
    styleObj = {
      format: "geostyler",
      style: props.lConf.style
    };
  } else if (props.lConf.style === "custom") {
    styleObj = {
      format: "custom",
      style: undefined
    };
  } else {
    return props.layer;
  }
  const olStyle = getOlStyle(styleObj);
  if (olStyle) {
    if (olStyle instanceof Promise) {
      olStyle
        .then((style) => {
          props.layer.setStyle(style.output);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.layer.setStyle(olStyle);
    }
  }
}
