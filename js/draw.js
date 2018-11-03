const drawVertex = (p) => {

  drawSvgVertex(p);

  if(p.hovered) {
    hoveredVertex = true;
  }

  // Hover or selected highlight
  if((p.hovered && !p.selected )|| p.stickyHovered) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, hoverRadius, Math.PI * 2,0);
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.strokeStyle = "rgba(0,0,0,.4)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

  } else if (p.selected) {

    ctx.beginPath();
    ctx.arc(p.x, p.y, hoverRadius, Math.PI * 2,0);
    ctx.fillStyle = selectedVertexFillStyle;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.stroke();
    // ctx.fill();
    ctx.closePath();

    // Vertex point
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(p.x - vertexSize/2, p.y - vertexSize/2, vertexSize, vertexSize);
    ctx.closePath();
  }
}

const drawSvgVertex = (p) => {
  if(!p.svgEl) { return }

  if(p.selected) {
    p.svgEl.querySelector(".bigcircle").setAttribute("stroke", "rgba(0,0,0,1)");
    p.svgEl.querySelector(".smallcircle").setAttribute("fill", "rgba(0,0,0,1)");
  } else if (p.hovered) {
    p.svgEl.querySelector(".bigcircle").setAttribute("stroke", "rgba(0,0,0,.3)");
    p.svgEl.querySelector(".smallcircle").setAttribute("fill", "none");
  } else if (p.stickyHovered) {
    p.svgEl.querySelector(".bigcircle").setAttribute("stroke", "none");
    p.svgEl.querySelector(".smallcircle").setAttribute("fill", "rgba(0,0,0,.5)");
  } else {
    p.svgEl.querySelector(".bigcircle").setAttribute("stroke", "none");
    p.svgEl.querySelector(".smallcircle").setAttribute("fill", "none");
  }

  p.svgEl.setAttribute("x",p.x);
  p.svgEl.setAttribute("y",p.y);
}

const clearCanvas = () => {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// Draw the segment that is being hovered
const drawHoverSegment = () => {
  if(hoverSegments.length === 0) { return }

  let closestSegment = hoverSegments.reduce((segment, closestSeg) => {
    if(segment.distance < closestSeg.distance) {
      return segment;
    } else {
      return closestSeg;
    }
  }, hoverSegments[0]);

  ctx.beginPath();
  ctx.moveTo(closestSegment.start.x, closestSegment.start.y);
  ctx.lineTo(closestSegment.end.x, closestSegment.end.y);
  ctx.lineWidth = 2;
  ctx.strokeStyle = hoverStrokeStyle;
  ctx.strokeStyle = "rgba(0,0,0,.4)";
  ctx.stroke();
  ctx.closePath();
}
