document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the saved items from sessionStorage
  const savedItems = JSON.parse(sessionStorage.getItem("savedItems"));

  if (savedItems && savedItems.length > 0) {
    const savedItemsSection = document.getElementById("saved-items");

    savedItemsSection.innerHTML = "<h2>Your Saved Items</h2>";

    savedItems.forEach((item, index) => {
      // Create a container for each saved item
      const itemContainer = document.createElement("div");
      itemContainer.className = "saved-item";
      itemContainer.innerHTML = item;

      savedItemsSection.appendChild(itemContainer);
    });
  }
});
