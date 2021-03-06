
class Grid {

    constructor(points) {
      this.points = points;

      this.lineWidth = 1;
      this.fillLineColor = "#AAA";
      this.numFillLines = shapeFillLineCount;

      this.outlineWidth = shapeOutlineLineWidth;
      this.outlineColor = shapeOutlineColor;
      this.fillStartPoint = 0;

      this.fillColorIndex = 0;

      this.hovered = false;
      this.selected = false;
      this.svgCreated = false;
      this.svgEl = false;
      this.uiEl = false;
    }

    createSvg() {

      this.svgCreated = true;

      // This is the actual image element
      this.svgEl = document.createElementNS("http://www.w3.org/2000/svg","polygon");
      this.svgEl.setAttribute("stroke-width", "1");
      this.svgEl.setAttribute("stroke", "rgba(0,0,0,0");
      this.svgEl.setAttribute("stroke-linejoin", "round");

      this.zIndex = (svgImage.querySelectorAll("polygon").length || 0)+ 1;

      svgImage.appendChild(this.svgEl);

      // This is for displaying selections, etc
      this.uiEl = document.createElementNS("http://www.w3.org/2000/svg","polygon");
      this.uiEl.setAttribute("stroke-width", "2");
      this.uiEl.setAttribute("stroke-linejoin", "round");
      this.uiEl.setAttribute("fill", "transparent");
      svgPoints.appendChild(this.uiEl);

      this.updatePoly();
    }

    // Update both the UI element
    updatePoly() {
      this.uiEl.setAttribute("stroke-width", "1");
      let pointsString = this.points.reduce((string, point) => {
        return string + parseInt(point.x) + "," + parseInt(point.y) + " ";
      }, "");

      if(this.mode == "ghost") { 
        this.svgEl.setAttribute("fill", "transparent");
        this.svgEl.setAttribute("stroke", "rgba(0,0,0,.2");
      } else if (this.mode == "invisible") {
        this.svgEl.setAttribute("fill", "transparent");
      } else {
        let color = availableColors[this.fillColorIndex] || "rgba(255,255,255,0)"
        this.svgEl.setAttribute("fill", color);
        this.svgEl.setAttribute("stroke", "rgba(0,0,0,.2");
      }
      
      if(this.selected) { 
        this.uiEl.setAttribute("stroke-width", "2");
        this.uiEl.setAttribute("stroke", "rgba(0,0,0,1");
      } else if(this.showHovered && this.showHover) { 
        this.uiEl.setAttribute("stroke-width", "1");
        this.uiEl.setAttribute("stroke", "rgba(0,0,0,.3");
      } else if(this.mode == "invisible") { 
        this.uiEl.setAttribute("stroke-width", "0");
        this.uiEl.setAttribute("stroke", "red");
      } else {
        this.uiEl.setAttribute("stroke-width", "1");
        this.uiEl.setAttribute("stroke", "transparent");
      }

      this.svgEl.setAttribute("points", pointsString);
      this.uiEl.setAttribute("points", pointsString);
    }

    canvasDraw() {

      if(this.svgCreated == false ){
        this.createSvg();
      } 
      this.updatePoly();
    }

    checkShapeHover() {
      let shapePoints = [];
      for(var i = 0; i < this.points.length; i++) {
        let p = this.points[i];
        shapePoints.push([p.x, p.y]);
      }
      this.hovered = testWithin([mouse.x, mouse.y], shapePoints);
    }

    click() {
      this.selected = !this.selected;
    }

    // Add hovered segments 
    checkHoverSegments() {
      for(var i = 0; i < this.points.length; i++){

        let thisP = this.points[i];
        let nextP = this.points[i + 1];
        let start, end, dist;
        dist = 0;

        if(!nextP) {
          nextP = this.points[0];
        }

        start = {x: thisP.x, y: thisP.y};
        end = {x: nextP.x, y: nextP.y};

        dist = distToSegment({x : mouse.x, y : mouse.y}, start, end);

        if(dist <= lineHoverDistance) {
          hoveredSegments.push(
            {
              start : { x : start.x, y: start.y },
              end : { x : end.x, y: end.y },
              distance : dist
            }
          )
        }
      }
    }

}
