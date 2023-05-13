import React, { useEffect, useState } from 'react';
import OpenSeadragon from 'openseadragon';

function Viewer(props) {
  const [progress, setProgress] = useState(0);

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

    console.log("PF = ",props.prefixUrl)
    console.log("tileSources = ",props.tileSources)

    // Add a custom progress bar control to the viewer
    const progressBar = document.createElement('div');
    progressBar.id = 'openseadragon-progress-bar';
    progressBar.style.position = 'absolute';
    progressBar.style.bottom = '10px';
    progressBar.style.left = '50%';
    progressBar.style.transform = 'translateX(-50%)';
    progressBar.style.width = '0%';
    progressBar.style.height = '5px';
    progressBar.style.backgroundColor = 'blue';
    viewer.addControl(progressBar, { anchor: OpenSeadragon.ControlAnchor.BOTTOM });

    // Update the progress bar as the image is being loaded
    viewer.addHandler('tile-drawing', () => {
      const tilesLoaded = viewer.world.getTilesLoaded();
      const tilesTotal = viewer.world.getTilesCount();
      const newProgress = Math.floor((tilesLoaded / tilesTotal) * 100);
      setProgress(newProgress);
      progressBar.style.width = `${newProgress}%`;
    });

    // Destroy the OpenSeadragon viewer when the component unmounts
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div>
      <div id={props.id}></div>
      <div>{progress}%</div>
    </div>
  );
}

export default Viewer;
