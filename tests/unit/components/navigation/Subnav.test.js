import { mount } from "@vue/test-utils";
import Subnav from "@/components/navigation/Subnav";

describe("Subnav", () => {
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const wrapper = mount(Subnav, createConfig("JobResults"));

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user is not on jobs page", () => {
    it("does not display job count", () => {
      const wrapper = mount(Subnav, createConfig("OtherPage"));

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
