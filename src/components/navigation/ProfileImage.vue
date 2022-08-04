<template>
  <img
    :src="imageLink"
    class="w-8 h-8 object-contain rounded-3xl"
    alt="a profile image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdRQkyJnY45wlcKinGmQoY8Qt7lLGye0-rcWO1CXo&s",
    };
  },
};
</script>

<style scoped></style>
