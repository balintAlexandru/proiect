
function filterEngines() {
        const searchQuery = document
          .getElementById("search")
          .value.toLowerCase();
        const engineType = document.getElementById("engine-type").value;
        const engines = document.querySelectorAll(".engine-card");
        engines.forEach((engine) => {
          const engineName = engine
            .querySelector("h3")
            .textContent.toLowerCase();
          const engineTypeData = engine.getAttribute("data-type").toLowerCase();
          const matchesSearch = engineName.includes(searchQuery);
          const matchesType =
            engineType === "" || engineTypeData === engineType.toLowerCase();
          if (matchesSearch && matchesType) {
            engine.style.display = "block";
          } else {
            engine.style.display = "none";
          }
        });
}
