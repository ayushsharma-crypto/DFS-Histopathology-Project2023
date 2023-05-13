import React, { createRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import ImageZoom from 'react-image-zoom';
import Zoom from './Zoom';
import Viewer from './viewerBar';

const ImageUploader = ( {getImage} ) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (acceptedFiles) => {
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    getImage(URL.createObjectURL(acceptedFiles[0]));
  }

  const handleImageProcess = (processedImage) => {
    setProcessedImage(processedImage);
  }

  return (
    <div>
      <Dropzone onDrop={handleImageUpload}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button>Drag and Drop Img</button>
          </div>
        )}
      </Dropzone>
      {/* {uploadedImage && (
        <ImageProcess
          src={uploadedImage}
          resize={{ width: 500, height: 500 }}
          blur={5}
          grayscale={true}
          onProcessFinish={handleImageProcess}
        />
      )} */}
    </div>
  );
};



function ImageViewer(props) {
	const [scale, setScale] = useState(1);
	const [mX, setMX] = useState(null);
	const [mY, setMY] = useState(null);
	const imgRef = createRef();
  
	const handleWheel = (event) => {
	  // increase or decrease the scale based on the scroll direction
	  const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1);
	  setScale(Math.max(1, Math.min(newScale, 5)));
	  event.preventDefault();
	}

	const handleMouseMovement = (event) => {
		if (imgRef.current===null) return;

		const {
			left: offsetLeft,
			top: offsetTop,
			width: boxW,
			height: boxH,
		} = imgRef.current.getBoundingClientRect()



		const x = ((event.pageX - offsetLeft) / parseInt(boxW, 10)) * 100
		const y = ((event.pageY - offsetTop) / parseInt(boxH, 10)) * 100
	
		setMX(x);
		setMY(y);


	}
  
	return (
		<div className='ImgContainer' ref={imgRef} onMouseMove={handleMouseMovement}>
		<div onWheel={handleWheel} style={{
			backgroundImage: `url('${props.src}')`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'auto 100%',
			transformOrigin: `${mX}% ${mY}%`,
			transform: `scale(${scale})`,
			width: `100%`,
			height: `100%`,
		}}></div>
		{/* <img src={props.src} alt={props.alt} onWheel={handleWheel}
		style={{
			transform: `transformOrigin: ${mX}% ${mY}%,scale(${scale})`,
			// position: "relative",
			// top: `50%`,
			// left: `50%`,
			// transform: `translate(-50%,-50%)`
			  
		}}
		/> */}
		</div>
	);
  }
  

const ImgVis = () => {
  const [uploadedImage, setUploadedImage] = useState(null);  
  return (
    <div >
      <ImageUploader getImage={img => setUploadedImage(img)} />
	  <div className='ImgSpace' >
		{ uploadedImage && 
		// <Zoom
		// img={uploadedImage}
		// zoomScale={3}
		// height={600}
		// width={600}
		// transitionTime={0.5}
		// />
		// <ImageViewer src={uploadedImage} alt="original" />
			<Viewer
			id="openseadragon-viewer"
			prefixUrl="http://127.0.0.1:8080/"
			tileSources="TCGA-AC-A6IW-01Z-00-DX1.C4514189-E64F-4603-8970-230FA2BB77FC.svs"
			zoomInButton="zoom-in"
			zoomOutButton="zoom-out"
			fullPageButton="full-page"
		/>
		}
	  </div>
	  {/* { uploadedImage && <ImageZoom
		  image={{ src: uploadedImage, alt: 'Uploaded Image' }}
	/>} */}
      {/* {uploadedImage && <ImagePreview image={uploadedImage} />} */}
    </div>
  );
};

export default ImgVis;
