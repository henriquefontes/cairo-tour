function renderizarAlbuns(albuns) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGVucmlxdWUwMDciLCJhIjoiY2xwczltZmRoMDFlaTJqbWx5eW53ZjVkZSJ9.gmY4F9A7gqbJTLsQdhgWBQ";

  const map = new mapboxgl.Map({
    container: "mapa-container",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [31.5, 27.0],
    zoom: 4.4,
  });

  const html = albuns.reduce((acc, album) => {
    acc += `
      <div class="col">
        <a href="./detalhes.html?id=${album.id}" class="album-card book">
          <img
            src="./assets/img/album-marker.png"
            class="album-marker"
            alt=""
          />
          <img
            src="${album.imagem}"
            alt=""
            class="album-image w-100"
          />
          <h3 class="album-title">${album.nome}</h3>
          <p class="album-description">
            ${album.descricao_curta}
          </p>
        </a>
      </div>
    `;

    const marker = document.createElement("img");
    marker.setAttribute("src", "./assets/img/pyramid.png");

    new mapboxgl.Marker({
      color: "yellow",
      draggable: false,
      element: marker,
    })
      .setLngLat([album.localizacao.longitude, album.localizacao.latitude])
      .setPopup(
        new mapboxgl.Popup().setHTML(`
          <img class="mapbox-popup-image" src="${album.imagem}">
          <h1 class="mapbox-popup-title">${album.nome}</h1>
          <p class="mapbox-popup-description">${album.descricao_curta}</p>
          <a href="./detalhes.html?id=${album.id}" style="color: blue">Ver mais..</a>
      `)
      )
      .addTo(map);

    return acc;
  }, "");

  document.getElementById("albunsContainer").innerHTML = html;
}

function renderizarDestaques(destaques) {
  let carouselIndicators = "";
  let carouselItems = "";

  if (!destaques.length) return;

  for (let i = 0; i < destaques.length; i++) {
    const destaque = destaques[i];

    carouselIndicators += `
        <button
          type="button"
          data-bs-target="#carouselPreview"
          data-bs-slide-to="${i}"
          class="${i == 0 ? "active" : ""}"
          aria-current="true"
          aria-label="Slide ${i}"
        ></button>
      `;

    carouselItems += `
      <a href="./detalhes.html?id=${destaque.id}" style="color: white;"
          <div class="carousel-item ${i == 0 ? "active" : ""}">
            <img
            src="${destaque.imagem}"
            class="d-block w-100"
            alt="..."
            />
            <div class="carousel-item-description-container">
              <p class="carousel-item-description">
                ${destaque.nome} - ${destaque.descricao_curta}
              </p>
            </div>
          </div>
      </a>
    `;
  }

  document.querySelector(".carousel-indicators").innerHTML = carouselIndicators;
  document.querySelector(".carousel-inner").innerHTML = carouselItems;
}

async function carregarPagina() {
  abrirCarregamento();

  const albuns = await api.get("albuns");
  const destaques = albuns.filter(({ destaque }) => destaque);

  renderizarAlbuns(albuns);
  renderizarDestaques(destaques);

  fecharCarregamento();
}

carregarPagina();
