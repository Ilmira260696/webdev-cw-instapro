import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { removeLikes, putLikes } from "../index.js";
import { posts, goToPage, deletePost } from "../index.js";
import { deleteFetch } from "../api.js";
// import { getList } from "../list-post.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
//  let postsHTML = posts.map((post) =>getList(post)).join("");
  let postsHTML = posts.map((post)=>{
    return `<li class="post">
    <div class="post-header" data-user-id=${post.user.id}>
        <img src=${post.user.imageUrl} class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src=${post.imageUrl}>
  </div>
      <div class="post-likes">
      <button data-id=${post.id} data-liked=${post.isLiked} class="like-button">
      ${post.isLiked ? `<img src="./assets/images/like-active.svg"></img>`
      : `<img src="./assets/images/like-not-active.svg"></img>`}
  </button>
  <p class="post-likes-text"> Нравится:
  ${post.likes.length === 0 ? 0 : post.likes.length === 1 ? post.likes[0].name
    : post.likes[(post.likes.length - 1)].name + ' и еще ' + (post.likes.length - 1)}  
  </p>
  </div>
  <div class="post-block"></div>



    <p class="post-text">
    <span class="user-name">${post.user.name}</span>
    ${post.description}
  </p>
  <button data-id=${post.id}  class="button delete-button">Удалить</button>
</li>`;
  }).join("");
  
 
 const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postsHTML}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
    
  
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

const deleteButtons = document.querySelectorAll(".delete-button");

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const id = deleteButton.dataset.id;
    deletePost(id);
  });
}

// function getLike() {
// //   const likesButton= document.querySelectorAll('.like-button');
// //   for (const likeButton of likesButton) {
// //     likeButton.addEventListener ("click",(event)=>{
// //       event.stopPropagation();
// //       const id= likeButton.dataset.id;
// //       const like= likeButton.dataset.like;

// //       if(like==false){
// //         putLikes(id);
// //       } else {
// //         removeLikes(id);
// //       }
// //   })
// // }
// // }
// getLike();
// }
function getLikePost() {

  const likesButton = document.querySelectorAll('.like-button');
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = like.dataset.id;
      const liked = like.dataset.liked;

      if (liked == 'false') {
        putLikes(id);
      } else {
        removeLikes(id);
      }

    })
  }
};
getLikePost();



}