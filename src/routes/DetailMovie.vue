<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useDetailMovieStore } from "~/store/detailMovie";
import Loading from "~/components/Loading.vue";

const route = useRoute();
const router = useRouter();

const detailMovieStore = useDetailMovieStore();

detailMovieStore.fetchDetailMovie({
  imdbID: route.params.id as string
});

function getHigherResolution(posterUrl: string) {
  if (posterUrl) {
    return posterUrl.replace("SX300", "SX700");
  }
  return;
}
</script>

<template>
  <div
    class="w-full h-screen flex justify-center items-center py-4 z-10"
    @click.self="router.push('/')">
    <div v-if="detailMovieStore.isLoading">
      <Loading></Loading>
    </div>
    <div
      v-else
      class="w-4/5 h-full flex rounded-3xl z-10 relative">
      <div class="w-full h-full">
        <img
          class="object-cover w-full h-full rounded-3xl"
          :src="
            getHigherResolution(detailMovieStore.detailMovie?.Poster as string)
          "
          alt="movie-poster" />
      </div>
      <div
        class="text-white p-5 flex items-center justify-center flex-col gap-8">
        <div>
          <span class="text-6xl font-bold">{{
            detailMovieStore.detailMovie?.Title
          }}</span>
        </div>
        <div class="flex flex-col">
          <span>{{ detailMovieStore.detailMovie?.Year }}</span>
          <span>{{ detailMovieStore.detailMovie?.Rated }}</span>
          <span>{{ detailMovieStore.detailMovie?.Genre }}</span>
        </div>
        <div>
          <span>{{ detailMovieStore.detailMovie?.Plot }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
