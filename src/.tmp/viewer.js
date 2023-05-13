import React, { useEffect } from 'react';
import OpenSeadragon from 'openseadragon';

function Viewer(props) {
  useEffect(() => {
    // Create a new OpenSeadragon viewer
    const viewer = OpenSeadragon({
      id: props.id,
      prefixUrl: props.prefixUrl,
      tileSources: props.tileSources,
      zoomInButton: props.zoomInButton,
      zoomOutButton: props.zoomOutButton,
      fullPageButton: props.fullPageButton,
    });

    // Add any additional event listeners or functionality here

    // Clean up function to destroy the OpenSeadragon viewer when the component unmounts
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div id={props.id}></div>
  );
}

export default Viewer;
