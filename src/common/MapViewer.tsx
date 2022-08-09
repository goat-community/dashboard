import { useRef, useEffect } from "react";
// OL Map
import { Map, View } from "ol";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import ImageWMS from "ol/source/ImageWMS";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import "ol/ol.css";
import { baseUrl, instance, styleVectorLayer } from "@utils";
import type { LayerStyle } from "@types";

interface MapViewerProps {
  layerURL: string;
  layerName?: string;
  layerStyle?: LayerStyle;
  layerType: "WMS" | "XYZ" | "MVT";
  mapAttribution?: string;
}

export function MapViewer(props: MapViewerProps) {
  const { layerURL, layerType, layerName, layerStyle, mapAttribution } = props;
  let mapRef = useRef<HTMLDivElement>();
  // we should decide on the map source type
  // to be used for the map
  const layer = () => {
    if (layerType === "XYZ") {
      return new TileLayer({
        source: new XYZ({
          url: layerURL
        })
      });
    }

    if (layerType === "WMS") {
      return new ImageLayer({
        source: new ImageWMS({
          url: layerURL.split("?")[0] + "?",
          params: { LAYERS: layerURL.split("=")[1] },
          serverType: "geoserver"
        }),
        opacity: 0.6
      });
    }

    if (layerType === "MVT") {
      const vtLayer = new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          format: new MVT(),
          url:
            layerURL ||
            baseUrl() + `/layers/tiles/${layerName}/{z}/{x}/{y}.pbf`,
          attributions: mapAttribution,
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
      if (layerStyle) {
        styleVectorLayer({
          layer: vtLayer,
          lConf: layerStyle
        });
      }
      return vtLayer;
    }
  };

  // Initilize the openlayer Map class
  useEffect(() => {
    // empty the div to handle the map refresh
    mapRef!.current!.innerHTML = "";
    // create the map
    new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 0.7
        }),
        layer()!
      ],
      view: new View({
        center: fromLonLat([12, 49]),
        zoom: 8
      })
    });
    // to re-render on map changes
  }, [layerURL, layerName, layerStyle, layerType]);

  return (
    <div ref={mapRef as any} style={{ width: "100%", height: "100%" }}></div>
  );
}
