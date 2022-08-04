import { mount } from "@vue/test-utils";

import ActionButton from "@/components/shared/ActionButton";

describe("ActionButton", function () {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "test text",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("test text");
  });

  it("applies primary style to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "test text",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });

  it("applies secondary style to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "test text",
        type: "secondary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(false);
  });
});
