import { mount } from "@vue/test-utils";

import JobSearchForm from "@/components/jobSearch/JobSearchForm";

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    const push = jest.fn();
    const $router = { push };

    const createConfig = () => ({
      attachTo: document.body,
      global: {
        mocks: {
          $router,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    it("directs user to job results page with user's search parameters", async () => {
      const wrapper = mount(JobSearchForm, createConfig());

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Software Engineer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("New York, NY");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Software Engineer",
          location: "New York, NY",
        },
      });
    });
  });
});
