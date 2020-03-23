window.addEventListener("load", function() {
  ymaps.ready(init);    
  function init(){ 
    var myMap = new ymaps.Map("map", {
      center: [27.985644, 86.925169],
      zoom: 17,
      type: 'yandex#satellite'
    });
    myPlacemark = new ymaps.Placemark([27.985644, 86.925169], {
      balloonContentHeader: "Эверест",
      balloonContentBody: "Тут у нас фабрика свечей",
      balloonContentFooter: "P.s. можно забрать самовывозом, но лучше мы доставим...",
      hintContent: "Фабрика-магазин"
    });
    myMap.geoObjects.add(myPlacemark);
  }
  
  //submit imitation
  let purchaseForm = document.forms.purchaseForm;
  purchaseForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let selectedPack = Array.from(purchaseForm.elements.price)
                            .filter(element => element.checked)
                            .map(element => element)[0];
    let materialSelect = selectedPack.nextElementSibling.querySelector(".material-select");
    let colorSelect = selectedPack.nextElementSibling.querySelector(".color-select");
    
    let selectedPackSize = selectedPack.value;
    let selectedMaterial = Array.from(materialSelect.options)
                                .filter(option => option.selected)
                                .map(option => option.value)[0];
    let selectedMColor = Array.from(colorSelect.options)
                                .filter(option => option.selected)
                                .map(option => option.value)[0];
    let email = document.querySelector("#email").value;
    
    let formData = new FormData();
    formData.append("packSize", selectedPackSize);
    formData.append("material", selectedMaterial);
    formData.append("color", selectedMColor);
    formData.append("email", email);
    
    let response = await fetch("https://www.freecodecamp.com/email-submit", {
      method: "POST",
      body: formData
    });

    let result = await response.json();
    alert(result.message);
  })
});
