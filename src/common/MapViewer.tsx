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
import "ol/ol.css";

interface MapViewerProps {
  mapURL: string;
  mapType: "WMS" | "XYZ";
}

export function MapViewer(props: MapViewerProps) {
  const { mapURL, mapType } = props;
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
