<template>
  <div class="flex flex-row flex-nowrap w-full">
    <JobFiltersSidebar />
    <JobListings />
  </div>
</template>

<script>
import JobFiltersSidebar from "@/components/jobResults/jobFiltersSidebar/JobFiltersSidebar";
import JobListings from "@/components/jobResults/JobListings";

export default {
  name: "JobResultsView",
  components: { JobListings, JobFiltersSidebar },
};
</script>
