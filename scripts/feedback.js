function saveForLater(sectionId) {
  // Retrieve the saved items from sessionStorage
  let savedItems = JSON.parse(sessionStorage.getItem("savedItems")) || [];

  // Find the section based on the provided sectionId
  const section = document.getElementById(sectionId);

  if (section) {
    // Serialize the section's HTML to store in saved items
    const sectionHTML = section.outerHTML;

    // Check if the section is already in the saved items list
    if (!savedItems.includes(sectionHTML)) {
      savedItems.push(sectionHTML);

      // Store the updated saved items list in sessionStorage
      sessionStorage.setItem("savedItems", JSON.stringify(savedItems));

      alert("You have " + savedItems.length + " saved items.");
    } else {
      alert("This item is already saved.");
    }
  }
}

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    likePost(button);
  });
});

function likePost(button) {
  const postId = button.getAttribute("data-post-id");
  let currentLikeCount = sessionStorage.getItem(`likeCount_${postId}`);
  currentLikeCount = currentLikeCount ? parseInt(currentLikeCount) : 0;
  currentLikeCount++;
  sessionStorage.setItem(`likeCount_${postId}`, currentLikeCount);
  document.getElementById(`${postId}-like`).textContent = currentLikeCount;
  button.disabled = true;
}

// Function to add a comment to session storage
function addCommentToStorage(postId, commentText) {
  const comments = getCommentsFromStorage(postId) || [];
  comments.push(commentText);
  sessionStorage.setItem(`comments${postId}`, JSON.stringify(comments));
}

// Function to retrieve comments from session storage
function getCommentsFromStorage(postId) {
  const storedComments = sessionStorage.getItem(`comments${postId}`);
  return storedComments ? JSON.parse(storedComments) : [];
}

// Function to add a comment to a post
function addComment(postId) {
  const commentList = document.getElementById(`commentList${postId}`);
  const newCommentInput = document.getElementById(`newComment${postId}`);
  const commentText = newCommentInput.value.trim();

  if (commentText) {
    addCommentToStorage(postId, commentText);
    updateCommentList(postId);
    newCommentInput.value = "";
  }
}

// Function to update the comment list for a post
function updateCommentList(postId) {
  const commentList = document.getElementById(`commentList${postId}`);
  const comments = getCommentsFromStorage(postId);

  commentList.innerHTML = ""; // Clear the list

  comments.forEach((commentText) => {
    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
  });
}

window.onload = function () {
  // Display comments for post 2
  displayComments(1);

  // Display comments for post 3
  displayComments(2);
};

function displayComments(postId) {
  const commentList = document.getElementById(`commentList${postId}`);
  commentList.style.display = "block"; // Show the comment list

  const comments = getCommentsFromStorage(postId);

  commentList.innerHTML = ""; // Clear the existing comments

  comments.forEach((commentText) => {
    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
  });
}
window.onload = function () {
  // Display comments for post 2
  displayComments(1);

  // Display comments for post 3
  displayComments(2);

  // Iterate over like buttons and retrieve their counts
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    const postId = button.getAttribute("data-post-id");
    const likeCount = sessionStorage.getItem(`likeCount_${postId}`);
    if (likeCount) {
      document.getElementById(`${postId}-like`).textContent = likeCount;
    }
  });
};
