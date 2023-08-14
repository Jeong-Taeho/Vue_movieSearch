<script setup lang="ts">
import { useMoviesStore } from "~/store/movies";
import { reactive, computed } from "vue";
import TheIcon from "~/components/TheIcon.vue";
import Button from "~/components/Button.vue";
import Loading from "~/components/Loading.vue";

const moviesStore = useMoviesStore();
const searchingMovie = reactive({ title: "", year: "", page: 1 });
const totalPage = computed(() => Math.ceil(moviesStore.totalResults / 10));
const searchingData = searchingMovie;
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

  if (moviesStore.movies.length && searchingMovie.page > 1) {
    searchingMovie.page -= 1;
    moviesStore.fetchMovies({ ...searchingMovie });
  }
  console.log(searchingData);
}

function moveNextPage() {
  if (moviesStore.movies.length && searchingMovie.page < totalPage.value) {
    searchingMovie.page += 1;
    moviesStore.fetchMovies({ ...searchingMovie });
  } else if (searchingMovie.page > totalPage.value) {
    alert("마지막 페이지 입니다.");
  }
  console.log(searchingData);
}
</script>

<template>
  <div class="bg-black w-full h-20 px-15 flex items-center justify-center">
    <div class="flex w-4/5 items-center gap-4">
      <div
        class="flex w-1/4 items-center text-white font-bold text-3xl cursor-pointer">
        <TheIcon>Movie</TheIcon>
        <h1 class="ml-3 w-4/5">영화 검색</h1>
      </div>
      <div
        class="flex flex-grow mr-10 text-xl h-10 px-4 bg-gray-600 rounded-lg items-center text-white">
        <input
          class="flex-grow w-full h-full flex outline-none border-none bg-inherit"
          v-model="searchingMovie.title"
          placeholder="영화 제목을 입력해주세요."
          @keydown.enter="searchMovies" />
        <TheIcon
          class="mr-2 cursor-pointer"
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
    <ul class="box-border grid grid-cols-5 gap-6 h-5/6">
      <li
        class="w-full h-full"
        v-for="movie in moviesStore.movies"
        :key="movie.imdbID">
        <router-link
          :to="{ name: 'DetailMovie', params: { id: movie.imdbID } }"
          :searchingData="searchingData">
          <div class="w-full h-full group relative">
            <div class="w-full h-full">
              <img
                v-if="movie.Poster !== 'N/A'"
                class="object-cover w-full h-full rounded-md transition-transform transform group-hover:scale-105"
                :src="movie.Poster"
                alt="movie-poster" />
              <div
                v-else
                class="w-full h-full text-white flex justify-center items-center">
                <span class="font-bold text-lg">No-Image</span>
              </div>
            </div>
            <div
              class="absolute w-full h-fit hidden group-hover:flex justify-center bottom-1">
              <span class="block text-white font-bold text-md text-center">{{
                movie.Title
              }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
    <div
      v-if="moviesStore.movies.length"
      class="flex justify-center">
      <Button @click="movePrePage">Prev</Button>
      <Button @click="moveNextPage">Next</Button>
    </div>
  </div>
</template>
