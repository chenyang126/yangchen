(function () {
  var details = {
    agent: {
      title: "Embodied Agent",
      body: "My current research studies embodied agents that can plan, act, and refine decisions under real physical constraints."
    },
    msra: {
      title: "Microsoft Research · 2025.06 - 2025.12",
      body: "During my internship at Microsoft Research, I worked on vision-language navigation and composable navigation primitives for office mobile robot scenarios."
    },
    agibot: {
      title: "AgiBot · 2026.06 - Now",
      body: "During my AgiBot internship, I focus on robotics systems, including perception, navigation, planning, control, and deployment in real-world robot settings."
    },
    planning: {
      title: "Task & Motion Planning",
      body: "I build reflective embodied planning systems that induce reusable rules from trajectories and refine decisions at test time."
    },
    navigation: {
      title: "Vision-Language Navigation",
      body: "I work on vision-language navigation datasets and composable primitives for long-horizon embodied instruction following."
    },
    robotics: {
      title: "Robotics System",
      body: "I develop mobile robot pipelines across perception, mapping, localization, path planning, motion control, and edge deployment."
    }
  };

  var detailBox = document.getElementById("mapDetail");
  var nodes = Array.prototype.slice.call(document.querySelectorAll(".map-node"));

  function selectNode(key) {
    var data = details[key];
    if (!data || !detailBox) return;
    nodes.forEach(function (node) {
      node.classList.toggle("is-active", node.dataset.node === key);
    });
    detailBox.innerHTML =
      '<span class="detail-kicker">Selected</span><h3>' +
      data.title +
      "</h3><p>" +
      data.body +
      "</p>";
  }

  nodes.forEach(function (node) {
    node.addEventListener("click", function () {
      selectNode(node.dataset.node);
    });
    node.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node.dataset.node);
      }
    });
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".publication-tab"));
  var panels = {
    selected: document.getElementById("selected-publications-panel"),
    all: document.getElementById("all-publications-panel")
  };

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var view = tab.dataset.publicationView;
      tabs.forEach(function (item) {
        var active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].hidden = key !== view;
      });
    });
  });

  var svg = document.getElementById("researchSvg");
  var stage = document.querySelector(".map-stage");
  var initialBox = { x: 0, y: 0, w: 920, h: 640 };
  var box = Object.assign({}, initialBox);
  var drag = null;

  function setBox(next) {
    box = next;
    svg.setAttribute("viewBox", [box.x, box.y, box.w, box.h].join(" "));
  }

  function zoom(factor, clientX, clientY) {
    if (!svg) return;
    var rect = svg.getBoundingClientRect();
    var px = clientX == null ? rect.left + rect.width / 2 : clientX;
    var py = clientY == null ? rect.top + rect.height / 2 : clientY;
    var sx = (px - rect.left) / rect.width;
    var sy = (py - rect.top) / rect.height;
    var nextW = Math.min(1120, Math.max(360, box.w * factor));
    var nextH = Math.min(760, Math.max(224, box.h * factor));
    var anchorX = box.x + box.w * sx;
    var anchorY = box.y + box.h * sy;
    setBox({
      x: anchorX - nextW * sx,
      y: anchorY - nextH * sy,
      w: nextW,
      h: nextH
    });
  }

  if (svg) {
    svg.addEventListener("wheel", function (event) {
      event.preventDefault();
      zoom(event.deltaY < 0 ? 0.88 : 1.12, event.clientX, event.clientY);
    }, { passive: false });

    svg.addEventListener("pointerdown", function (event) {
      drag = { x: event.clientX, y: event.clientY, box: Object.assign({}, box) };
      if (stage) stage.classList.add("is-dragging");
      svg.setPointerCapture(event.pointerId);
    });

    svg.addEventListener("pointermove", function (event) {
      if (!drag) return;
      var rect = svg.getBoundingClientRect();
      var dx = ((event.clientX - drag.x) / rect.width) * drag.box.w;
      var dy = ((event.clientY - drag.y) / rect.height) * drag.box.h;
      setBox({
        x: drag.box.x - dx,
        y: drag.box.y - dy,
        w: drag.box.w,
        h: drag.box.h
      });
    });

    svg.addEventListener("pointerup", function (event) {
      drag = null;
      if (stage) stage.classList.remove("is-dragging");
      svg.releasePointerCapture(event.pointerId);
    });

    svg.addEventListener("pointercancel", function () {
      drag = null;
      if (stage) stage.classList.remove("is-dragging");
    });
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-map-zoom]")).forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.dataset.mapZoom;
      if (action === "in") zoom(0.82);
      if (action === "out") zoom(1.18);
      if (action === "reset") setBox(Object.assign({}, initialBox));
    });
  });
})();
