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

function closeModal() {
  router.go(-1);
}
</script>

<template>
  <div
    class="w-full h-screen flex justify-center items-center py-4"
    @click.self="closeModal()">
    <div v-if="detailMovieStore.isLoading">
      <Loading></Loading>
    </div>
    <div
      v-else
      class="w-4/5 h-full flex rounded-3xl z-10 relative">
      <div class="w-[1200px] h-full">
        <img
          v-if="detailMovieStore.detailMovie?.Poster !== 'N/A'"
          class="object-cover w-full h-full rounded-3xl"
          :src="
            getHigherResolution(detailMovieStore.detailMovie?.Poster as string)
          "
          alt="movie-poster" />
        <img
          class="object-cover w-full h-full rounded-3xl"
          v-else
          src="https://previews.123rf.com/images/julynx/julynx1408/julynx140800023/30746516-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EA%B1%B0%EB%82%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%A7%84-%EC%97%86%EC%9D%8C.jpg"
          alt="no-image" />
      </div>
      <div
        class="flex-grow text-white p-5 flex items-center justify-center flex-col gap-8">
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
