<template>
  <div>
    <MainNav />
    <router-view />
  </div>
</template>

<script>
import MainNav from "@/components/navigation/MainNav";
export default {
  name: "App",
  components: { MainNav },
};
</script>
