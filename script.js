let startIndex = 0;
let endIndex = 10;

async function getPets() {
  let pets = await fetch("./pets.json").then((res) => res.json());

  displayPets(pets);

  window.addEventListener("scroll", function () {
    const { scrollHeight, clientHeight, scrollTop } =
      this.document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.setTimeout(() => {
        startIndex += 10;
        endIndex += 10;
        displayPets(pets);
      }, 1000);
    }
  });
}

function displayPets(pets) {
  let petCards = document.querySelector(".pet-cards");

  if (endIndex > pets?.length) {
    endIndex = pets.length;
  }

  for (let i = startIndex; i < endIndex; i++) {
    let pet = pets[i];
    const content = `<div class="pet-card" id=${pet.id}>
                        <img src=${pet.image} alt=${pet.name}/>
                        <div class="card-title">
                            <h2>${pet.name}</h2>
                            <p class="age">Age: ${pet.age}</p>
                        </div>
                        <button class="adopt-button"> + Adopt</button>
                    </div>`;

    petCards.insertAdjacentHTML("beforeend", content);
  }

  displayDetails(pets);
}

function displayDetails(pets) {
  const popup = document.querySelector(".pet-details");
  const closeBtn = document.querySelector(".close-btn");

  const popupImg = document.querySelector(".details-img");
  const popupName = document.querySelector(".details-name");
  const popupAge = document.querySelector(".details-age");
  const popupDescription = document.querySelector(".details-description");
  const popupAdoptionFee = document.querySelector(".details-adoption-fee");
  const popupPetType = document.querySelector(".details-type");
  const popupPetGender = document.querySelector(".details-gender");

  const petCardList = document.querySelectorAll(".pet-card");

  petCardList.forEach((petCard) => {
    petCard.addEventListener("click", (event) => {
      const petId = event.currentTarget.getAttribute("id");

      const petDetails = pets?.find((e) => e.id === petId);

      if (petDetails) {
        // Update the popup elements with the pet data
        popupImg.src = petDetails?.image;
        popupImg.alt = petDetails?.name;
        popupName.textContent = petDetails?.name;
        popupAge.textContent = `Age: ${petDetails?.age}`;
        popupDescription.textContent = `Description: ${petDetails?.description}`;
        popupAdoptionFee.textContent = `Price : $ ${petDetails.adoption_fee}`;
        popupPetType.textContent = `Type : ${petDetails.type}`;
        popupPetGender.textContent = `Gender : ${petDetails.gender}`;

        // Show the popup
        popup.classList.remove("hidden");
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    // Hide the popup
    popup.classList.add("hidden");
  });
}

getPets();
