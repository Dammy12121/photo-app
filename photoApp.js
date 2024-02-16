let page = 1;

      async function getPhotos() {
        try {
          const apiKey =
            "oNXjnGKzElrDQBBgJMsEdC4Wd3T1EJS5VGG9EnwFrtWDhk6sw1KBbLtt";
          const search = document.getElementById("search").value;
          const url = `https://api.pexels.com/v1/search?query=${search}&page=${page}`;

          showLoadingSpinner();

          const response = await fetch(url, {
            headers: {
              Authorization: apiKey,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`
            );
          }

          const photos = await response.json();
          displayPhotos(photos.photos);
        } catch (error) {
          console.error("Error fetching photos:", error.message);
          // Handle the error, e.g., display an error message to the user
        } finally {
          // Hide loading spinner after fetching data
          hideLoadingSpinner();
        }
      }

      function showLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
          loadingSpinner.style.display = "block";
        }
      }

      function hideLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
          loadingSpinner.style.display = "none";
        }
      }

      function displayPhotos(array) {
        let display = array
          .map(
            (item) => `
  <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <a href=${item.url} target='_blank' class="text-decoration-none">
      <div class="card">
        <img src=${item.src.portrait} alt=${item.alt}/> 
        <div class='card-body'>
          <h3 class="card-title fs-6 text-truncate" style="max-height: 8em;">${item.alt}</h3>
          <p class="card-text">${item.photographer}</p>
        </div>
      </div>
    </a>
  </div>`
          )
          .join("");

        let displayContainer = document.getElementById("display");
        displayContainer.innerHTML = display;
      }

      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      function nextPage() {
        page += 1;
        pageNumber.innerText = page;
        getPhotos(page);
        scrollToTop();
      }

      function previousPage() {
        page -= 1;
        if (page <= 0) {
          page = 1;
        } else {
          pageNumber.innerText = page;
          getPhotos(page);
          scrollToTop();
        }
      }