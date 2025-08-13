// import domtoimage from "dom-to-image";

// // Helper function to handle download logic
// const initiateDownload = (url, format) => {
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `customized-image.${format}`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

// // Helper function to get SVG BBox (get svg dimensions) or provide fallback
// const getSvgContentBBox = (svgElement, fallbackWidth, fallbackHeight) => {
//   try {
//     const bbox = svgElement.getBBox();
//     if (bbox.width === 0 || bbox.height === 0) {
//       console.warn(
//         "getSvgContentBBox: BBox dimensions are zero. Using fallback."
//       );
//       return {
//         x: 0,
//         y: 0,
//         width: fallbackWidth || 600,
//         height: fallbackHeight || 400,
//       };
//     }
//     return bbox;
//   } catch (e) {
//     console.warn("getSvgContentBBox: Could not get BBox. Using fallback.", e);
//     return {
//       x: 0,
//       y: 0,
//       width: fallbackWidth || 600,
//       height: fallbackHeight || 400,
//     };
//   }
// };

// // To Download SVG as an SVG file
// export const handleDownloadSVG = (
//   svgJsDraw,
//   customWidth,
//   customHeight,
//   originalSvgWidth,
//   originalSvgHeight
// ) => {
//   if (!svgJsDraw.current) {
//     alert("Error: SVG content is not loaded. Please upload an SVG first.");
//     return;
//   }

//   const finalWidth =
//     customWidth && typeof customWidth === "number" && customWidth > 0
//       ? customWidth
//       : originalSvgWidth || 600;
//   const finalHeight =
//     customHeight && typeof customHeight === "number" && customHeight > 0
//       ? customHeight
//       : originalSvgHeight || 400;

//   const originalSvgElement = svgJsDraw.current.node;
//   const newSvgNode = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     "svg"
//   );

//   newSvgNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//   newSvgNode.setAttribute("width", `${finalWidth}`);
//   newSvgNode.setAttribute("height", `${finalHeight}`);
//   newSvgNode.setAttribute("preserveAspectRatio", "none");
//   newSvgNode.setAttribute("viewBox", `0 0 ${finalWidth} ${finalHeight}`);

//   const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
//   const originalContentBBox = getSvgContentBBox(
//     originalSvgElement,
//     originalSvgWidth,
//     originalSvgHeight
//   );

//   // If original content has valid dimensions, apply transform
//   if (originalContentBBox.width > 0 && originalContentBBox.height > 0) {
//     const scaleX = finalWidth / originalContentBBox.width;
//     const scaleY = finalHeight / originalContentBBox.height;
//     const translateX = -originalContentBBox.x * scaleX;
//     const translateY = -originalContentBBox.y * scaleY;
//     gElement.setAttribute(
//       "transform",
//       `translate(${translateX} ${translateY}) scale(${scaleX} ${scaleY})`
//     );

//     Array.from(originalSvgElement.children).forEach((child) => {
//       gElement.appendChild(child.cloneNode(true));
//     });
//     newSvgNode.appendChild(gElement);
//   } else {
//     // Fallback: If BBox is zero, just append original content (might be empty or malformed)
//     const clonedContent = originalSvgElement.cloneNode(true);
//     while (clonedContent.firstChild) {
//       newSvgNode.appendChild(clonedContent.firstChild);
//     }
//   }

//   const svgString = new XMLSerializer().serializeToString(newSvgNode);
//   const blob = new Blob([svgString], { type: "image/svg+xml" });
//   initiateDownload(URL.createObjectURL(blob), "svg");
// };

// //