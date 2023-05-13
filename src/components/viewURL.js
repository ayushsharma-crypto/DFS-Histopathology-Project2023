import React, { useState, useEffect } from 'react';
import { OpenSeaDragonViewer } from './OpenSeaDragonViewer';

function ViewURL({images}) {
  useEffect(() => {
    if(!images ) return;
  }, [images]);


  const [manifest, setManifest] = useState();

  const previewImage = async (slide) => {
    setManifest(slide.slide);
  };


  return (
    <div 
     className="view-url"
     style={{
       display: "flex",
       justifyContent:'space-between'
       }}
    >
      
      <div id="tissue">
        <h2>Tissues Available to Visualise</h2>
        <hr></hr>
            {images.map((group, index) => {
              return (
                <div 
                style={{
                  display:"flex",
                  flexDirection:'column'
                  }}
                >
                  <h3 key={index}>{group.name}</h3>
                  {group.slides.map((slide, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          return previewImage(slide);
                        }}
                      >
                        {slide.name}
                      </button>
                    );
                  })}
                </div>
              );
            })}
      </div>
      <div>
      <OpenSeaDragonViewer image={manifest} />
      </div>
    </div>
  );
}

export default ViewURL;
