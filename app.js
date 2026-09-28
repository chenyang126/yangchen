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
      title: "Robotics Systems",
      body: "I develop mobile robot pipelines across perception, mapping, localization, path planning, motion control, and edge deployment."
    }
  };

  var relatedLinks = {
    agent: [{ label: "Explore publications", href: "#publications" }],
    navigation: [
      { label: "Move2Anything", href: "https://move2anything.netlify.app/" },
      { label: "HarnessVLN", href: "https://agibot-harnessvln.netlify.app/" }
    ],
    planning: [
      { label: "Re²", href: "#paper-re2" },
      { label: "DualWorldBench", href: "https://dualworld.netlify.app/" }
    ],
    robotics: [{ label: "HarnessVLN", href: "https://agibot-harnessvln.netlify.app/" }],
    msra: [{ label: "Move2Anything", href: "https://move2anything.netlify.app/" }],
    agibot: [{ label: "HarnessVLN", href: "https://agibot-harnessvln.netlify.app/" }]
  };

  var detailBox = document.getElementById("mapDetail");
  var nodes = Array.prototype.slice.call(document.querySelectorAll(".map-node"));

  function selectNode(key) {
    var data = details[key];
    if (!data || !detailBox) return;
    nodes.forEach(function (node) {
      var active = node.dataset.node === key;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-pressed", String(active));
    });
    var kicker = key === "agent" ? "Overview" :
      (key === "msra" || key === "agibot" ? "Research internship" : "Research direction");
    detailBox.replaceChildren();
    var label = document.createElement("span");
    label.className = "detail-kicker";
    label.textContent = kicker;
    var title = document.createElement("h3");
    title.textContent = data.title;
    var body = document.createElement("p");
    body.textContent = data.body;
    var links = document.createElement("div");
    links.className = "detail-links";
    relatedLinks[key].forEach(function (item) {
      var link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      var arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = " ↗";
      link.appendChild(arrow);
      // A publication anchor must also reveal its panel if the other tab is open.
      if (item.href === "#paper-re2") {
        link.addEventListener("click", function () {
          document.getElementById("selected-publications-tab").click();
        });
      }
      links.appendChild(link);
    });
    detailBox.append(label, title, body, links);
  }

  nodes.forEach(function (node) {
    node.setAttribute("aria-pressed", String(node.classList.contains("is-active")));
    node.addEventListener("click", function () {
      selectNode(node.dataset.node);
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
        item.tabIndex = active ? 0 : -1;
      });
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].hidden = key !== view;
      });
    });
    tab.addEventListener("keydown", function (event) {
      var index = tabs.indexOf(tab);
      if (event.key === "ArrowRight") index = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") index = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") index = 0;
      else if (event.key === "End") index = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[index].focus();
      tabs[index].click();
    });
  });

})();
