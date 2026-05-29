import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Simple HTML escaping to prevent XSS
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default class Comments {
  constructor(productId) {
    this.productId = productId;
    this.storageKey = `so-comments-${productId}`;
  }

  getComments() {
    return getLocalStorage(this.storageKey) || [];
  }

  saveComment(author, text) {
    const comments = this.getComments();
    comments.push({
      author: author.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString(),
    });
    setLocalStorage(this.storageKey, comments);
  }

  renderCommentItem({ author, text, date }) {
    return `
      <li class="comment-item">
        <div class="comment-header">
          <span class="comment-author">${escapeHtml(author)}</span>
          <span class="comment-date">${escapeHtml(date)}</span>
        </div>
        <p class="comment-text">${escapeHtml(text)}</p>
      </li>
    `;
  }

  renderComments() {
    const comments = this.getComments();
    const list = document.querySelector(".comments-list");
    if (comments.length === 0) {
      list.innerHTML = '<li class="no-comments">No comments yet. Be the first!</li>';
    } else {
      list.innerHTML = comments.map((c) => this.renderCommentItem(c)).join("");
    }
  }

  init() {
    const container = document.querySelector(".product-detail");
    container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="comments-section divider">
        <h3>Customer Comments</h3>
        <ul class="comments-list"></ul>
        <form class="comment-form">
          <h4>Leave a Comment</h4>
          <div class="comment-form__field">
            <label for="comment-author">Name</label>
            <input type="text" id="comment-author" placeholder="Your name" required />
          </div>
          <div class="comment-form__field">
            <label for="comment-text">Comment</label>
            <textarea id="comment-text" rows="4" placeholder="Share your thoughts..." required></textarea>
          </div>
          <button type="submit">Post Comment</button>
        </form>
      </section>
    `
    );

    this.renderComments();

    document.querySelector(".comment-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("comment-author").value;
      const text = document.getElementById("comment-text").value;
      this.saveComment(author, text);
      this.renderComments();
      e.target.reset();
    });
  }
}
