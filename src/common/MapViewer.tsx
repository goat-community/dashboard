import { useRef, useEffect } from "react";
// OL Map
import { Map, View } from "ol";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
// import ImageLayer from "ol/source/Image";
// import TileWMS from "ol/source/TileWMS";
import ImageWMS from "ol/source/ImageWMS";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import "ol/ol.css";
import { baseUrl, instance, OlStyleFactory } from "@utils";

interface MapViewerProps {
  mapURL: string;
  mapName?: string;
  layerStyle?: object;
  mapType: "WMS" | "XYZ" | "MVT";
}

function styleVectorLayer(layer: any, lConf: any) {
  // Style the vector tile layer
  let styleObj;
  if (typeof lConf.style === "object") {
    styleObj = {
      format: "geostyler",
      style: lConf.style
    };
  } else if (lConf.style === "custom") {
    styleObj = {
      format: "custom"
    };
  } else {
    return layer;
  }
  const olStyle = OlStyleFactory.getOlStyle(styleObj);
  if (olStyle) {
    if (olStyle instanceof Promise) {
      olStyle
        .then((style) => {
          layer.setStyle(style);
        })
        .catch((error) => {
          console.log(error);
          console.log("error", lConf.name);
        });
    } else {
      layer.setStyle(olStyle);
    }
  }
}

export function MapViewer(props: MapViewerProps) {
  const { mapURL, mapType, mapName, layerStyle } = props;
  const mapRef = useRef<HTMLDivElement>();
  // we should decide on the map source type
  // to be used for the map
  const layer = () => {
    if (mapType === "XYZ") {
      return new TileLayer({
        source: new XYZ({
          url: mapURL
        })
      });
    }

    if (mapType === "WMS") {
      return new ImageLayer({
        source: new ImageWMS({
          url: mapURL.split("?")[0] + "?",
          params: { LAYERS: mapURL.split("=")[1] },
          serverType: "geoserver"
        }),
        opacity: 0.6
      });
    }

    if (mapType === "MVT") {
      let map_url = mapURL
        ? mapURL
        : baseUrl() + `/layers/tiles/${mapName}/{z}/{x}/{y}.pbf`;

      const layer = new VectorTileLayer({
        source: new VectorTileSource({
          format: new MVT(),
          url: map_url,
          tileLoadFunction: function (tile: any, url) {
            tile.setLoader(function (extent: any, _: any, projection: any) {
              instance
                .get(url, {
                  responseType: "arraybuffer",
                  headers: {
                    Accept: "application/pdf"
                  }
                })
                .then((response) => {
                  if (response.data) {
                    const format = tile.getFormat(); // ol/format/MVT configured as source format
                    const features = format.readFeatures(response.data, {
                      extent: extent,
                      featureProjection: projection
                    });
                    tile.setFeatures(features);
                  }
                });
            });
          }
        })
      });
      return styleVectorLayer(layer, {
        style: layerStyle?.style,
        name: mapName
      });
    }
  };

  // Initilize the openlayer Map class
  useEffect(() => {
    new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 1
        }),
        layer()!
      ],
      view: new View({
        center: fromLonLat([12, 49]),
        zoom: 8
      })
    });
    // to re-render on map changes
  }, [mapURL, mapURL]);

  return <div ref={mapRef as any} style={{ width: "100%", height: "100%" }} />;
}
