async function carregarPagina() {
  const url = new URL(window.location.href);
  const album = url.searchParams.get("album");
  const slideIndex = url.searchParams.get("slide");

  abrirCarregamento();

  const fotos = await api.get("fotos?album=" + album);

  if (!fotos) return;

  let carouselIndicators = "";
  let carouselItems = "";

  for (let i = 0; i < fotos.length; i++) {
    const foto = fotos[i];

    carouselIndicators += `
        <button
          type="button"
          data-bs-target="#carouselPreview"
          data-bs-slide-to="${i}"
          class="${i == slideIndex ? "active" : ""}"
          aria-current="true"
          aria-label="Slide ${i}"
        ></button>
      `;

    carouselItems += `
        <div class="carousel-item ${i == slideIndex ? "active" : ""}">
          ${
            foto.video
              ? `
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/${foto.video}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          `
              : `
            <img
              src="${foto.imagem}"
              class="d-block w-100"
              alt="..."
            />
          `
          }
          <div class="carousel-item-description-container">
            <p class="carousel-item-description">
              ${foto.descricao}
            </p>
          </div>
        </div>
    `;
  }

  document.querySelector(".carousel-indicators").innerHTML = carouselIndicators;
  document.querySelector(".carousel-inner").innerHTML = carouselItems;
  document
    .getElementById("voltar")
    .setAttribute("href", "./detalhes.html?id=" + album);

  fecharCarregamento();
}

carregarPagina();
