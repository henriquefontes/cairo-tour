function renderizarAlbum(album) {
  const $imagem = document.getElementById("imagem-album");
  const $titulo = document.getElementById("titulo-album");
  const $descricao = document.getElementById("descricao-album");
  const $localizacao = document.getElementById("localizacao-album");
  const $latitude = document.getElementById("latitude-album");
  const $longitude = document.getElementById("longitude-album");
  const $data = document.getElementById("data-album");
  const $botao = document.getElementById("destacar-album");

  if (album.destaque) {
    $botao.classList.remove("bx-star");
    $botao.classList.add("destacado");
    $botao.classList.add("bxs-star");
  } else {
    $botao.classList.add("bx-star");
    $botao.classList.remove("destacado");
    $botao.classList.remove("bxs-star");
  }

  $imagem.src = album.imagem;
  $titulo.innerText = album.nome;
  $descricao.innerText = album.descricao;
  $localizacao.innerText = album.localizacao.nome;
  $latitude.innerText = album.localizacao.latitude;
  $longitude.innerText = album.localizacao.longitude;
  $data.innerText = album.data_registro;
}

async function destacarAlbum(album) {
  const $botao = document.getElementById("destacar-album");

  abrirCarregamento();

  await api.patch("albuns/" + album.id, { destaque: !album.destaque });

  album.destaque = !album.destaque;

  if (album.destaque) {
    $botao.classList.remove("bx-star");
    $botao.classList.add("destacado");
    $botao.classList.add("bxs-star");
  } else {
    $botao.classList.add("bx-star");
    $botao.classList.remove("destacado");
    $botao.classList.remove("bxs-star");
  }

  fecharCarregamento();
}

function renderizarFotos(fotos) {
  const html = fotos.reduce((acc, foto, index) => {
    acc += `
      <div class="col">
        <a href="./preview.html?album=${foto.album}&slide=${index}" 
           class="album-card ${index % 2 == 0 ? "rz-p2" : "rz-n2"}"
        >
          <div class="album-image-container">
            <img
              src="${foto.imagem}"
              alt=""
              class="album-image w-100"
            />
            ${
              foto.video
                ? `
              <div class="album-video-play">
                <i class="bx bx-play-circle text-light"></i>
              </div>
            `
                : ""
            }
          </div>
          <p style="transform: none" class="album-description">
            ${foto.descricao}
          </p>
        </a>
      </div>
    `;

    return acc;
  }, "");

  document.getElementById("fotosContainer").innerHTML = html;
}

async function carregarPagina() {
  const url = new URL(window.location.href);
  const album = url.searchParams.get("id");

  abrirCarregamento();

  const dadosAlbum = await api.get("albuns/" + album);
  const fotos = await api.get("fotos?album=" + album);

  renderizarAlbum(dadosAlbum);
  if (fotos) renderizarFotos(fotos);

  const $botaoDestacar = document.getElementById("destacar-album");
  $botaoDestacar.addEventListener("click", () => {
    destacarAlbum(dadosAlbum);
  });

  fecharCarregamento();
}

carregarPagina();
