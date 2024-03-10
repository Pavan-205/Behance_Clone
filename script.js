
// Addition of Projects
const additionalProjects = [
    { title: "Freepik", category: "design", imageUrl: "https://img.freepik.com/free-vector/design-process-concept-landing-page_23-2148313670.jpg" },
    { title: "Pixabay", category: "photography", imageUrl: "https://cdn.pixabay.com/photo/2014/02/02/17/40/photographs-256888_640.jpg" },
    { title: "Iconsplash", category: "illustration", imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/000/217/368/small/vector-colourful-red-landscape-illustration.jpg" },
    { title: "Buffer", category: "design", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU54eyJ_fzl9Gy4ZKzZ9fnObJjMsp6yCfgSA&usqp=CAU" },
    { title: "Unsplash", category: "photography", imageUrl: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/07/social-media-for-photographers-follow-1.jpg" },
    { title: "Boom", category: "illustration", imageUrl: "https://www.creativeboom.com/uploads/articles/b6/b69c283db081ed7337ddeffd53228fb737c930b5_810.jpg" },
    { title: "Guide", category: "presentation", imageUrl: "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/08/presentation-design.png" },
    { title: "Hub Spot", category: "presentation", imageUrl: "https://www.hubspot.com/hubfs/Powerpoint%20presentation.jpg" },
    { title: "Business", category: "presentation", imageUrl: "https://i.insider.com/5395c6986bb3f7502095212f?width=1000&format=jpeg&auto=webp" },
    { title: "IndiaMart", category: "digital art", imageUrl: "https://i.etsystatic.com/27748029/r/il/e1e2f0/4647108632/il_570xN.4647108632_nbe6.jpg" },
    { title: "Oil Paint", category: "digital art", imageUrl: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/89150/250282/1668324869830_717FF2C6-8682-4BE0-883D-D74CE9207A92__30870.1687001573.jpg?c=2" },
  ];
  
  const projects = [
    { title: "Kambaa", category: "design", imageUrl: "https://www.kambaaincorporation.com/images/logo-design.jpg" },
    { title: "Editoralite", category: "photography", imageUrl: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-learning-feature.jpg" },
    { title: "Kambaa", category: "illustration", imageUrl: "https://unblast.com/wp-content/uploads/2023/09/Girl-with-a-Cup-of-Coffee-Illustration.jpg" },
    ...additionalProjects,
  ];
  
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const categoryDropdown = document.getElementById("category-dropdown");
  const projectsContainer = document.getElementById("projects-container");
  
  // Function to update search results
  function updateSearchResults() {
    const query = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(query)
    );
  
    searchResults.innerHTML = "";
    filteredProjects.forEach(project => {
        const resultItem = document.createElement("div");
        resultItem.textContent = project.title;
        resultItem.addEventListener("click", () => {
            searchInput.value = project.title;
            searchResults.style.display = "none";
            updateProjects();
        });
        searchResults.appendChild(resultItem);
    });
  
    searchResults.style.display =
        filteredProjects.length > 0 ? "block" : "none";
  }

  // Add an event listener to handle clicks outside the search results
    document.addEventListener("click", function(event) {
        if (!searchResults.contains(event.target) && event.target !== searchInput) {
            searchResults.style.display = "none";
        }
    });

  
    
    
  // Function to update projects based on category
  function updateProjects() {
    projectsContainer.onclick = function () {
        searchResults.style.display = "none";
    };
    const category = categoryDropdown.value;
    const filteredProjects =
        category === "all"
            ? projects
            : projects.filter(project => project.category === category);
  
    projectsContainer.innerHTML = "";
  
    const groupedProjects = {};
    filteredProjects.forEach(project => {
        if (!groupedProjects[project.category]) {
            groupedProjects[project.category] = [];
        }
        groupedProjects[project.category].push(project);
    });
  
    for (const categoryKey in groupedProjects) {
        const categoryRow = document.createElement("div");
        categoryRow.className = "project-row";
  
        groupedProjects[categoryKey].forEach(project => {
          // Inside the loop where project cards are created
          const projectCard = document.createElement("div");
          projectCard.className = "project-card";
  
          const projectImage = document.createElement("img");
          projectImage.src = project.imageUrl;
          projectImage.alt = project.title; // Add alt attribute for accessibility
          projectImage.className = "project-image"; // Add a class to target the image
          projectCard.appendChild(projectImage);
  
          // Add click event listener to each project image
          projectImage.addEventListener("click", function() {
              enlargeImage(project.imageUrl, project.title);
          });
  
          const projectDetails = document.createElement("div");
          projectDetails.className = "project-details";
          projectCard.appendChild(projectDetails);
  
          const projectTitle = document.createElement("div");
          projectTitle.textContent = project.title;
          projectDetails.appendChild(projectTitle);
  
          // Create like container
          const likeContainer = document.createElement("div");
          likeContainer.className = "like-container";
          projectDetails.appendChild(likeContainer);
  
          // Create like button
          const likeButton = document.createElement("button");
          likeButton.className = "like-button";
          likeButton.innerHTML = "&#x2661;"; // Empty heart emoji
          likeContainer.appendChild(likeButton);
  
          // Create like counter
          const likeCounter = document.createElement("div");
          likeCounter.className = "like-counter";
          likeCounter.textContent = "0"; // Initial value
          likeContainer.appendChild(likeCounter);
  
          likeButton.addEventListener("click", function() {
              if (!likeButton.classList.contains("liked")) {
                  likeButton.classList.add("liked");
                  likeButton.innerHTML = "&#x2764;&#xFE0F;"; // Red heart emoji
                  likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
              } else {
                  likeButton.classList.remove("liked");
                  likeButton.innerHTML = "&#x2661;"; // Empty heart emoji
                  likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
              }
          });
  
          categoryRow.appendChild(projectCard);
        });
  
        projectsContainer.appendChild(categoryRow);
    }
  }
  
  
  // Function to enlarge image
  function enlargeImage(imageUrl, title) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";
  
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "&times;"; // Unicode for 'x' symbol
      closeBtn.className = "close-btn";
      overlay.appendChild(closeBtn);
  
      const enlargedImage = document.createElement("img");
      enlargedImage.src = imageUrl;
      enlargedImage.alt = title; // Add alt attribute for accessibility
      overlay.appendChild(enlargedImage);
  
  
      // Add event listener to close the overlay when clicking the close button
      closeBtn.addEventListener("click", function() {
          overlay.remove();
      });
  
      // Add event listener to close the overlay when clicking outside the image
      overlay.addEventListener("click", function(event) {
          if (event.target === overlay) {
              overlay.remove();
          }
      });
  
      document.body.appendChild(overlay);
  }
  
  
  // Event listeners
  searchInput.addEventListener("input", updateSearchResults);
  categoryDropdown.addEventListener("change", updateProjects);
  
  // Initial project update
  updateProjects();
  