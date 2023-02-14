import * as $ from "jquery";

const createAnalytics = () => {
  let counter = 0;

  $(document).on("click", () => counter++);

  return {
    getCount() {
      return counter;
    },
  };
};

window.analytics = createAnalytics();
