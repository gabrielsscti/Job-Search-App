<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :job="job"
        :key="job.id"
        data-test="job-listing"
      />
      <div class="mt-8 mx-auto">
        <div class="flex flex-row flex-nowrap">
          <p class="text-sm flex-grow">Page {{ currentPage }}</p>
          <div class="flex items-center justify-center">
            <router-link
              :to="{ name: 'JobResults', query: { page: previousPage } }"
              v-if="previousPage"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              data-test="previous-page-link"
              >Previous</router-link
            >
            <router-link
              :to="{ name: 'JobResults', query: { page: nextPage } }"
              v-if="nextPage"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              data-test="next-page-link"
              >Next</router-link
            >
          </div>
        </div>
      </div>
    </ol>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { FETCH_JOBS } from "@/store";
import JobListing from "@/components/jobResults/JobListing";

export default {
  name: "JobListings",
  components: { JobListing },

  mounted() {
    this.FETCH_JOBS();
  },

  computed: {
    currentPage() {
      const page = this.$route.query.page || "1";
      return Number.parseInt(page);
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = firstJobIndex + 10;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
    ...mapState(["jobs"]),
  },
  methods: {
    ...mapActions([FETCH_JOBS]),
  },
};
</script>

<style scoped></style>
