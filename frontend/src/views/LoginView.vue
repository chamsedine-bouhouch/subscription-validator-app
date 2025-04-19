<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4 sm:p-6 lg:p-8"
  >
    <div class="w-full max-w-md">
      <!-- Card container -->
      <div
        class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
      >
        <!-- Card content -->
        <div class="px-6 pt-16 pb-8">
          <h2 class="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p class="text-center text-sm text-gray-600 mb-8">
            Sign in to your account to continue
          </p>

          <!-- Error message -->
          <div
            v-if="errorMessage"
            class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-pulse"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Login form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label
                for="email-address"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email address</label
              >
              <div class="relative rounded-md shadow-sm">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  v-model="email"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
                >Password</label
              >
              <div class="relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  v-model="password"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform transition-all duration-150 ease-in-out hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? "Signing in..." : "Sign in" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";

// Form data
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

// Get router and auth store
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  // Component is mounted, safe to use router and authStore
});

// Handle login form submission
const handleLogin = async () => {
  try {
    errorMessage.value = "";
    isLoading.value = true;

    // Call the login action from the auth store
    await authStore.login({
      email: email.value,
      password: password.value,
      remember: rememberMe.value,
    });

    // Redirect to dashboard on success
    router.push({ name: "Dashboard" });
  } catch (error) {
    // Handle login errors
    errorMessage.value =
      error.message || "Failed to sign in. Please check your credentials.";
  } finally {
    isLoading.value = false;
  }
};
</script>
