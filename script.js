document.addEventListener("DOMContentLoaded", function() {
  const dragItems = document.querySelectorAll(".drag-item");
  const dropContainer = document.getElementById("drop-container");
  const resetButton = document.getElementById("reset-button");
  
  // Store the initial state of the drag container
  const initialDragContainer = document.getElementById("drag-container").innerHTML;
  
  // Add event listeners for drag events
  dragItems.forEach(function(item) {
    item.addEventListener("dragstart", handleDragStart);
  });
  
  dropContainer.addEventListener("dragenter", handleDragEnter);
  dropContainer.addEventListener("dragover", handleDragOver);
  dropContainer.addEventListener("dragleave", handleDragLeave);
  dropContainer.addEventListener("drop", handleDrop);
  
  resetButton.addEventListener("click", handleReset);
  
  let draggedItem = null;
  
  function handleDragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.outerHTML);
    event.target.classList.add("dragging");
  }
  
  function handleDragEnter(event) {
    event.preventDefault();
    dropContainer.classList.add("drag-over");
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
  }
  
  function handleDragLeave(event) {
    dropContainer.classList.remove("drag-over");
  }
  
  function handleDrop(event) {
    event.preventDefault();
    dropContainer.classList.remove("drag-over");
    const data = event.dataTransfer.getData("text/plain");
    const newItem = document.createElement("div");
    newItem.innerHTML = data;
    dropContainer.appendChild(newItem.firstElementChild);
    draggedItem.remove();
    draggedItem = null;
    showSuccessMessage();
  }
  
  function handleReset() {
    dropContainer.innerHTML = "";
    document.getElementById("drag-container").innerHTML = initialDragContainer;
    // Add event listeners for drag events to the new drag items
    dragItems.forEach(function(item) {
      item.addEventListener("dragstart", handleDragStart);
    });
  }
  
  // function showSuccessMessage() {
  //   // Replace or update this function to display a success message or update the UI as desired
  //   alert("Item dropped successfully!");
  // }
});
