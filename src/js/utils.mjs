// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParameters(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param); 
  return product;
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path} (status ${response.status})`);
  }
  const template = await response.text();
  return template;
}



//renderListWithTemplate, It should receive five (5) arguments: templateFn, parentElement, list, position, and clear.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  } 
  const html = list.map(item => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, html);
} 

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/templates/header.html");
    const footerTemplate = await loadTemplate("/templates/footer.html");
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) {
      headerElement.innerHTML = headerTemplate;
    }
    if (footerElement) {
      footerElement.innerHTML = footerTemplate;
    }
  } catch (error) {
    // Shared templates are optional, so fail silently if they cannot be loaded.
  }
}