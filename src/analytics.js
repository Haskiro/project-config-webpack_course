const createAnalytics = () => {
  let counter = 0;

  document.addEventListener("click", () => counter++);

  return {
    getCount() {
      return counter;
    },
  };
};

window.analytics = createAnalytics();
