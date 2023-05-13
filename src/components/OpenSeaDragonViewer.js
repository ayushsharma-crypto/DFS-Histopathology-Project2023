import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";


const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState( null);
  const [takess, setTakess] = useState(false);
  useEffect(() => {
    if (image && viewer ) {
      viewer.open(image.source);
      setTakess(true);
    }
  }, [image, viewer]);
  
  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        prefixUrl: "openseadragon-images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        showNavigator:  true,
        crossOriginPolicy: "Anonymous"
      })
    );

  };

  function takeSS(){
    if(!takess) return;
    var current_view = document.getElementsByTagName("canvas");
    if (current_view){
      console.log(current_view.length);
      var my_view = current_view[0];
      var img = my_view.toDataURL("image/png");
      const link = document.createElement('a')
      link.href = img
      link.download = 'tissue.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  useEffect(() => {
    if(!image ) return;
    InitOpenseadragon();
    return () => {
        viewer && viewer.destroy();
    };
  }, [image]);

  return (
    <div className="Viewer">
      <div 
      id="openSeaDragon" 
      style={{
        height: "800px",
        width: "1200px"
      }}
      >
      </div>
      <button onClick={takeSS} >Print View</button>

    </div>

  );
};

export { OpenSeaDragonViewer };
