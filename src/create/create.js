import axios from "axios";
import "@app/utils/header";
import { getHeaders } from "./api";
const createForm = document.forms.createPost;
const cancelPost = document.querySelector("#cancel-post-submit-button");
cancelPost.addEventListener("click", () => {
  window.location.href = "/";
});
createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = event.target.elements["title"].value;
  const description = event.target.elements["description"].value;
  const tags = event.target.elements["tags"].value;
  const url = event.target.elements["image-url"].value;
  const alt = event.target.elements["image-alt"].value;
  const date = event.target.elements["date"].value;

  try {
    const response = await axios.post(
      "https://v2.api.noroff.dev/auction/listings",
      {
        title: title,
        description: description,
        tags: tags.split(","),
        media: [
          {
            url: url,
            alt: alt,
          },
        ],
        endsAt: new Date(date).toISOString(),
      },
      {
        headers: getHeaders(),
      },
    );



    const createPopupElm = document.querySelector("#create-success-popup");
    createPopupElm.classList.remove("hidden");

    const closeCreatePopup = document.querySelector("#close-create-popup");
    closeCreatePopup.addEventListener("click", () => {
      createPopupElm.classList.add("hidden");
      window.location.href = "/";
    });
    console.log(response);
  } catch (error) {
    const errors = error.response.data.errors;
    const errorsElm = document.getElementById("errors-create");
    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });
    errorsElm.innerHTML = newErrors;
    console.log(error);
  }
});
