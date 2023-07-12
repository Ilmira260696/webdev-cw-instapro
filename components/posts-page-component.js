import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { posts, goToPage } from "../index.js";
import { getList } from "../list-post.js";

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
}

