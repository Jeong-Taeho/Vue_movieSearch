<script setup lang="ts">
import { useMoviesStore } from "~/store/movies";
import { reactive, computed } from "vue";
import TheIcon from "~/components/TheIcon.vue";
import Button from "~/components/Button.vue";
import Loading from "~/components/Loading.vue";

const moviesStore = useMoviesStore();

const searchingMovie = reactive({ title: "", year: "", page: 1 });
const totalPage = computed(() => Math.ceil(moviesStore.totalResults / 10));

async function searchMovies() {
  const { title, year, page } = searchingMovie;
  if (!title) {
    alert("검색어를 입력해주세요!");
    return;
  }
  await moviesStore.fetchMovies({
    title,
    year,
    page
  });
  // 검색된 결과가 없을 때 처리
  if (!moviesStore.movies) {
    alert("검색된 영화가 없습니다.");
  }
}

function movePrePage() {
  if (searchingMovie.page === 1) {
    alert("첫번째 페이지 입니다.");
  }

  if (moviesStore.movies && searchingMovie.page > 1) {
    searchingMovie.page--;
    moviesStore.fetchMovies({ ...searchingMovie });
  }
}

function moveNextPage() {
  if (moviesStore.movies && searchingMovie.page < totalPage.value) {
    searchingMovie.page++;
    moviesStore.fetchMovies({ ...searchingMovie });
  }
}
</script>

<template>
  <div class="bg-black w-full h-20 px-15 flex items-center justify-center">
    <div class="flex w-4/5 items-center gap-4">
      <div class="flex w-1/4">
        <TheIcon>Movie</TheIcon>
        <h1 class="w-4/5 text-white font-bold text-3xl">영화 검색</h1>
      </div>
      <div
        class="flex flex-grow mr-10 text-xl h-10 px-4 bg-gray-600 rounded-lg items-center text-white">
        <input
          class="flex-grow w-full h-full flex outline-none border-none bg-inherit"
          v-model="searchingMovie.title"
          placeholder="영화 제목을 입력해주세요."
          @keydown.enter="searchMovies" />
        <TheIcon
          class="mr-2"
          @click="searchMovies"
          >search</TheIcon
        >
      </div>
    </div>
  </div>
  <div v-if="moviesStore.isLoading">
    <Loading></Loading>
  </div>
  <div
    v-else
    class="px-12 my-5">
    <ul class="box-border grid grid-cols-5 gap-6">
      <li
        v-for="movie in moviesStore.movies"
        :key="movie.imdbID">
        <router-link
          :to="{ name: 'DetailMovie', params: { id: movie.imdbID } }">
          <div class="w-full h-full group relative">
            <div class="w-full h-5/6 cursor-pointer">
              <img
                v-if="movie.Poster !== 'N/A'"
                class="object-cover w-full h-full rounded-md transition-transform transform group-hover:scale-105"
                :src="movie.Poster"
                alt="movie-poster" />
            </div>
            <div
              class="absolute w-full h-full hidden group-hover:flex justify-center">
              <span class="block text-white font-bold text-xl text-center">{{
                movie.Title
              }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="flex justify-center">
      <Button
        v-if="moviesStore.movies.length"
        @click="movePrePage"
        >Prev</Button
      >
      <Button
        v-if="moviesStore.movies.length"
        @click="moveNextPage"
        >Next</Button
      >
    </div>
  </div>
</template>
