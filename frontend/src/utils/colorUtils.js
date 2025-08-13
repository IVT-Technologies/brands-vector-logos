export const handleColorChange = (e, selectedElement, svgJsDraw, svgContainerRef, setCurrentColor, setSvgContent, setUndoStack) => {
  const newColor = e.target.value;
  setCurrentColor(newColor);

  if (!selectedElement || !svgJsDraw.current) return;

  const element = svgJsDraw.current.findOne(`#${selectedElement.id}`);
  if (!element) return;

  if (svgContainerRef.current) {
    const currentSvg = svgContainerRef.current.querySelector("svg")?.outerHTML;
    if (currentSvg) setUndoStack((prev) => [...prev, currentSvg]);
  }

  element[selectedElement.type](newColor);
  element.node.style[selectedElement.type] = newColor;

  const updatedSvg = new XMLSerializer().serializeToString(svgJsDraw.current.node);
  setSvgContent(updatedSvg);
};