import { SVG } from "@svgdotjs/svg.js";
import { flattenSvgStyles } from "./svgHelper";

export const loadSvgIntoContainer = async (svgUrl, containerRef, svgJsDrawRef, onElementClick) => {
  const { getProxiedSvg } = await import("../apis/Alphabetical_Api");

  const res = await getProxiedSvg(svgUrl);
  let svgString = flattenSvgStyles(res);

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = svgString;
  const svgElement = tempDiv.querySelector("svg");
  if (!svgElement) throw new Error("No SVG element found");

  svgElement.removeAttribute("width");
  svgElement.removeAttribute("height");
  svgElement.style.width = "100%";
  svgElement.style.height = "100%";

  const validTags = ["path", "circle", "rect", "ellipse", "polygon", "polyline", "line", "text", "g"];
  let idCounter = 0;

  const assignIds = (node) => {
    if (node.nodeType === 1 && validTags.includes(node.tagName.toLowerCase())) {
      node.style.cursor = "pointer";
      if (!node.id) node.id = `svg-part-${idCounter++}`;
    }
    Array.from(node.children).forEach(assignIds);
  };
  assignIds(svgElement);

  containerRef.current.innerHTML = "";
  containerRef.current.appendChild(svgElement);

  svgJsDrawRef.current = SVG(svgElement);
  svgJsDrawRef.current.find(validTags.join(", ")).forEach((el) => {
    el.on("click", onElementClick(el));
  });
};


export const loadSVG = async ({
  svgUrl,
  svgContainerRef,
  svgJsDraw,
  setCurrentColor,
  setSelectedElement,
  colorInputRef,
}) => {
  const rgbToHex = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (!result) return "#000000";
    return (
      "#" +
      result
        .slice(0, 3)
        .map((x) => {
          const hex = parseInt(x, 10).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  try {
    await loadSvgIntoContainer(
      svgUrl,
      svgContainerRef,
      svgJsDraw,
      (el) => (e) => {
        e.stopPropagation();
        e.preventDefault();

        const styles = getComputedStyle(el.node);
        const hasFill = !["none", "rgba(0, 0, 0, 0)"].includes(styles.fill);
        const hasStroke = !["none", "rgba(0, 0, 0, 0)"].includes(styles.stroke);
        const type = hasFill ? "fill" : hasStroke ? "stroke" : "fill";

        const rawColor = styles[type] || "#000000";
        const hexColor = rawColor.startsWith("rgb")
          ? rgbToHex(rawColor)
          : rawColor;

        setCurrentColor(hexColor);
        setSelectedElement({ id: el.attr("id"), type });

        if (colorInputRef.current) {
          colorInputRef.current.value = hexColor;
          requestAnimationFrame(() => colorInputRef.current.click());
        }
      }
    );
  } catch (err) {
    console.error("Error loading SVG:", err);
    svgContainerRef.current.innerHTML = `<img src="${svgUrl}" alt="Logo" style="width:100%; height:100%; object-fit:contain;" />`;
  }
};
