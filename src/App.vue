<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>
<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/Interfaces';
import { useRouter, useRoute } from 'vue-router';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.CHECKING) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.AUTHENTICATED) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
