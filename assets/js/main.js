document.querySelectorAll(".search-pool-id").forEach(row => {
  row.addEventListener("click", e => {
    if (!e.target.closest("a")) {
      window.location = row.dataset.href;
    }
  });
});