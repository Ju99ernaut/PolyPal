// Save & load a picture from localstorage

const saveButton = document.querySelector(".save")
    , loadButton = document.querySelector(".load")
    , resetButton = document.querySelector(".reset")
    , wobbleButton = document.querySelector(".wobble");

const resetPicture = () => {
    // let size = 85;
    let startX = Math.floor(canvasWidth / 2);
    let startY = Math.floor(canvasHeight / 2);

    clearExistingPicture();

    // newPoints = gem;
    // console.log(gemGrids);
    // points = newPoints.map(p => createPoint(p));

    grids = [];
    points = [];

    gemGrids.map(grid => {
      grid.points.map(p => {
        let found = false;
        for(var i = 0; i < points.length; i++) {
          if(comparePoints(p, points[i])) {
            found = true;
          }
        }
        if(found == false) {
          points.push(createPoint(p));
        }
      });
    });

    gemGrids.map(grid => {
      let newArray = [];

      grid.points = grid.points.map(p => {
        for(var i = 0; i < points.length; i++) {
          let existingPoint = points[i];
          if(comparePoints(p,existingPoint)) {
            return existingPoint;
          }
        }
      });

      grids.push(
        createGrid(grid.points, { fillColor : grid.fillColor})
      );
    });

    frameLoop();
}

const clearExistingPicture = () => {
  points = customFilter(points, (() => true));
  grids = customFilter(grids, (() => true));
}

const createPoint = p => {

  let group = document.createElementNS("http://www.w3.org/2000/svg","svg");
  group.setAttribute("x", p.x);
  group.setAttribute("y", p.y);

  let circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  circle.setAttribute("cx", 0);
  circle.classList.add("bigcircle");
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 14);
  circle.setAttribute("stroke", "transparent");
  circle.setAttribute("stroke-width", 2);
  circle.setAttribute("fill", "transparent");

  let smallCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  smallCircle.classList.add("smallcircle");
  smallCircle.setAttribute("cx", 0);
  smallCircle.setAttribute("cy", 0);
  smallCircle.setAttribute("r", 3);
  smallCircle.setAttribute("fill", "transparent");

  group.append(circle);
  group.append(smallCircle);

  svgPoints.appendChild(group);

  return {
      x : p.x,
      y : p.y,
      svgEl : group
  }
}

const loadPicture = () => {
 
 let picture = window.localStorage.getItem("picture");

  clearExistingPicture();

  if(picture) {
    let pictureData = JSON.parse(picture);
    let savedGrids = pictureData.grids;

    grids = [];

    let newPoints = [];

    points = pictureData.grids.map(grid => {
      grid.points.map(p => {
        let thisPoint = { x : p.x, y: p.y};
        let found = false;
        for(var i = 0; i < newPoints.length; i++) {
          if(comparePoints(thisPoint, newPoints[i])) {
            found = true;
          }
        }
        if(found == false) {
          newPoints.push(thisPoint);
        }
      });
    });

    points = newPoints.map(p => {
      return createPoint(p);
    });


    savedGrids.map(grid => {
      let newArray = [];

      grid.points = grid.points.map(p => {
        for(var i = 0; i < points.length; i++) {
          let existingPoint = points[i];
          if(comparePoints(p,existingPoint)) {
            return existingPoint;
          }
        }
      });

      grids.push(
        createGrid(grid.points, { fillColor : grid.fillColor})
      );
    });
    frameLoop();
    return true;
  } else {
    return false;
  }

}

saveButton.addEventListener("click", () => {

  let savedGrids = grids.map(grid => {
    return {
      points : grid.points.map(p => {
        return { x: p.x, y: p.y};
      }),
      fillColor : grid.fillColor
    }
  });

  console.log(JSON.stringify(savedGrids));

  window.localStorage.setItem("picture", JSON.stringify({
      grids : savedGrids
  }));
});

loadButton.addEventListener("click", () => {
  loadPicture();
});

// wobbleButton.addEventListener("mousedown", () => {
//   wobble = true;
// });

// wobbleButton.addEventListener("mouseup", () => {
//   wobble = false;
// });

resetButton.addEventListener("click", () => {
  resetPicture();
});
