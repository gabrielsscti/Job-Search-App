import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

import JobListings from "@/components/jobResults/JobListings.vue";

jest.mock("axios");

describe("JobListings.vue", () => {
  afterEach(() => {
    axios.get.mockReset();
  });
  beforeEach(() => {
    const JOBS_LEN = 15;
    axios.get.mockResolvedValue({ data: Array(JOBS_LEN).fill({}) });
  });

  const createConfig = (page = 1) => ({
    global: {
      mocks: {
        $route: {
          query: {
            page,
          },
        },
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    shallowMount(JobListings, createConfig());
    const baseUrl = process.env.VUE_APP_API_URL;
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/jobs`);
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    const MAX_JOBS = 10;
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(MAX_JOBS);
  });

  describe("when query params excludes page number", () => {
    it("displays page number 1", () => {
      const wrapper = shallowMount(JobListings, createConfig(undefined));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params includes page number", () => {
    it("displays page number", () => {
      const wrapper = shallowMount(JobListings, createConfig(3));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const wrapper = shallowMount(JobListings, createConfig(1));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const wrapper = shallowMount(JobListings, createConfig(1));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("does not show link to next page", async () => {
      const wrapper = shallowMount(JobListings, createConfig(2));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      const wrapper = shallowMount(JobListings, createConfig(2));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
