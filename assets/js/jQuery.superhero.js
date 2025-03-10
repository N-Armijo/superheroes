jQuery.fn.superhero = function(token, heroId) {
  console.log(token, heroId)
  let accessToken = token
  let idSuperHero = heroId;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${accessToken}/${idSuperHero}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*"
    }
  };
  $.ajax(settings)
  .done(function (response) {
    //Grafico
    // Poblando los datapoints
    const chartData = []
    for(const power in response.powerstats) {
      if(response.powerstats[power] !== "null" ) {
        chartData.push({ y: Number(response.powerstats[power]), label: power })
      } else {
        continue;
      }
    }
    $("#heroChart").CanvasJSChart({
      // opciones
      title: {
        animationEnabled: true,
        text: `Estadísticas de Poder para ${response.name}`,
        fontSize: 28
      },
      data: [
        {
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          dataPoints: chartData
        }
      ]
    })
    heroCard(response)
  })
  .fail();
  return this
}
function heroCard(response) {
  let heroCard = 
    `
    <h3 class="text-center">SuperHero Encontrado</h3>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${response.image.url}" class="img-fluid rounded-start " alt="${response.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${response.name}</h5>
            <p class="card-text">Conexiones: ${response.connections.relatives}</p>
            <em class="card-text"><small class="text-body-secondary">Publicado por: ${response.biography.publisher}</small></em>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Ocupación: ${response.work.occupation}</li>
            <li class="list-group-item">Primera Aparición: ${response.biography["first-appearance"]}</li>
            <li class="list-group-item">Altura: ${response.appearance.height[1]}</li>
            <li class="list-group-item">Peso: ${response.appearance.weight[1]}</li>
            <li class="list-group-item">Alianzas: ${response.connections["group-affiliation"]}</li>
          </ul>
        </div>
      </div>
    </div>
  `
  $("#heroCard").html(heroCard);
}