/* --------------------
   GLOBAL DATA
-------------------- */
let posts = [];
let messages = [];
let profile = {};

/* --------------------
   PROFILE
-------------------- */
function createProfile() {
  const username = document.getElementById("profile-username").value;
  const avatar = document.getElementById("profile-avatar").value;

  if (!username) {
    notify("Username is required");
    return;
  }

  profile = { username, avatar };
  localStorage.setItem("profile", JSON.stringify(profile));
  notify("Profile saved");
}

/* --------------------
   THEME
-------------------- */
function changeTheme() {
  const theme = document.getElementById("theme-select").value;
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

/* --------------------
   POSTS
-------------------- */
function addPost() {
  const input = document.getElementById("post-input");
  const premium = document.getElementById("premium-checkbox").checked;

  if (!input.value) return;

  posts.unshift({
    text: input.value,
    premium
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  input.value = "";
  renderPosts();
}

function renderPosts() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = p.premium ? "⭐ " + p.text : p.text;
    feed.appendChild(li);
  });
}

/* --------------------
   CHAT (LOCAL)
-------------------- */
function sendMessage() {
  const user = document.getElementById("chat-username").value;
  const msg = document.getElementById("chat-message").value;

  if (!user || !msg) return;

  messages.push(user + ": " + msg);
  localStorage.setItem("messages", JSON.stringify(messages));

  document.getElementById("chat-message").value = "";
  renderChat();
}

function renderChat() {
  const box = document.getElementById("chat-box");
  box.innerHTML = "";

  messages.forEach(m => {
    const div = document.createElement("div");
    div.innerText = m;
    box.appendChild(div);
  });
}

/* --------------------
   NOTIFICATION
-------------------- */
function notify(text) {
  const n = document.getElementById("notification");
  n.innerText = text;
  setTimeout(() => n.innerText = "", 2000);
}

/* --------------------
   LOAD SAVED DATA
-------------------- */
window.onload = function () {
  const savedProfile = localStorage.getItem("profile");
  const savedTheme = localStorage.getItem("theme");
  const savedPosts = localStorage.getItem("posts");
  const savedMessages = localStorage.getItem("messages");

  if (savedProfile) profile = JSON.parse(savedProfile);
  if (savedTheme) document.body.className = savedTheme;
  if (savedPosts) posts = JSON.parse(savedPosts);
  if (savedMessages) messages = JSON.parse(savedMessages);

  renderPosts();
  renderChat();
};
