import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/jobResults/JobListing.vue";

describe("JobListing", () => {
  const createConfig = (job) => ({
    props: {
      job,
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("Rendering", () => {
    it("renders job title", () => {
      const wrapper = mount(
        JobListing,
        createConfig({ title: "Software Engineer" })
      );
      expect(wrapper.text()).toMatch("Software Engineer");
    });

    it("renders job organization", () => {
      const wrapper = mount(
        JobListing,
        createConfig({ organization: "AirBnB" })
      );
      expect(wrapper.text()).toMatch("AirBnB");
    });

    it("renders job locations", () => {
      const wrapper = mount(
        JobListing,
        createConfig({ locations: ["San Francisco", "Jacksonville"] })
      );
      expect(wrapper.text()).toMatch("San Francisco");
      expect(wrapper.text()).toMatch("Jacksonville");
    });

    it("renders job qualifications", () => {
      const wrapper = mount(
        JobListing,
        createConfig({ minimumQualifications: ["Code", "Develop"] })
      );
      expect(wrapper.text()).toMatch("Code");
      expect(wrapper.text()).toMatch("Develop");
    });
  });

  describe("Linking", () => {
    it("links to individual job's page", () => {
      const wrapper = mount(JobListing, createConfig({ id: "12" }));
      const jobPageLink = wrapper.findComponent(RouterLinkStub);
      jobPageLink.props("to");
      expect(jobPageLink.props("to")).toBe("/jobs/results/12");
    });
  });
});
