import * as $ from "jquery";

const createAnalytics = (): object => {
  let counter = 0;

  $(document).on("click", (): number => counter++);

  return {
    getCount(): number {
      return counter;
    },
  };
};

window["analytics"] = createAnalytics();
