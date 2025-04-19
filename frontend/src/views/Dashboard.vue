<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold leading-tight text-gray-900">
              Inscriptions Dashboard
            </h1>
          </div>
          <div class="mt-4 flex items-center md:mt-0 md:ml-4">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 mr-3"
              @click="refreshData"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  type="button"
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="profileDropdownOpen = !profileDropdownOpen"
                >
                  <span class="sr-only">Open user menu</span>
                  <div
                    class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium"
                  >
                    {{ userInitials }}
                  </div>
                </button>
              </div>

              <!-- Dropdown menu -->
              <div
                v-if="profileDropdownOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <div class="px-4 py-3">
                  <p class="text-sm">Signed in as</p>
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ user.email }}
                  </p>
                </div>
                <div class="border-t border-gray-100"></div>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  @click="navigateToProfile"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  @click="navigateToSettings"
                >
                  Settings
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  @click="logout"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <!-- Total Inscriptions -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                <svg
                  class="h-6 w-6 text-emerald-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Inscriptions
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ totalInscriptions }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Validated Inscriptions -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg
                  class="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Validated</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ validatedCount }}
                    </div>
                    <div
                      class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                    >
                      {{ Math.round((validatedCount / totalInscriptions) * 100) }}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Tokens Generated -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg
                  class="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Tokens Generated
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ tokensGeneratedCount }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-medium leading-6 text-gray-900 mb-4">Filters</h2>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700"
              >Search</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="search"
                id="search"
                v-model="searchQuery"
                class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID or name"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="status" class="block text-sm font-medium text-gray-700"
              >Status</label
            >
            <div class="mt-1">
              <select
                id="status"
                name="status"
                v-model="statusFilter"
                class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="validated">Validated</option>
                <option value="pending">Pending</option>
                <option value="token-generated">Token Generated</option>
              </select>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="date-range" class="block text-sm font-medium text-gray-700"
              >Date Range</label
            >
            <div class="mt-1">
              <select
                id="date-range"
                name="date-range"
                v-model="dateRangeFilter"
                class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Token
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="inscription in filteredInscriptions"
                    :key="inscription.id"
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ inscription.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ inscription.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(inscription.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          inscription.validated
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800',
                        ]"
                      >
                        {{ inscription.validated ? "Validated" : "Pending" }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span v-if="inscription.token">
                        {{ inscription.token.substring(0, 8) }}...
                      </span>
                      <span v-else class="text-gray-400"> Not generated </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <button
                        v-if="!inscription.validated"
                        @click="validateInscription(inscription)"
                        class="text-emerald-600 hover:text-emerald-900 mr-4"
                      >
                        Validate
                      </button>
                      <button
                        v-if="inscription.validated && !inscription.token"
                        @click="generateToken(inscription)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Generate Token
                      </button>
                      <button
                        v-if="inscription.token"
                        @click="viewDetails(inscription)"
                        class="text-gray-600 hover:text-gray-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>

                  <!-- Empty state -->
                  <tr v-if="filteredInscriptions.length === 0">
                    <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-500">
                      <div class="flex flex-col items-center justify-center">
                        <svg
                          class="h-10 w-10 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p class="mt-2 font-medium">No inscriptions found</p>
                        <p class="mt-1">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white',
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
            ]"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            :class="[
              'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white',
              currentPage >= totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-50',
            ]"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ startItem }}</span>
              to
              <span class="font-medium">{{ endItem }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500',
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50',
                ]"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <template v-for="page in displayedPages" :key="page">
                <button
                  v-if="page !== '...'"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    currentPage === page
                      ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              </template>

              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500',
                  currentPage >= totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50',
                ]"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal for token generation -->
    <div
      v-if="showModal"
      @keydown.esc="showModal = false"
      class="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Background overlay - fixed to ensure it covers the entire screen -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="showModal = false"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative z-50"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
            >
              <svg
                class="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Token Generated Successfully
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  The token has been generated for inscription #{{
                    selectedInscription?.id
                  }}. You can copy it below.
                </p>
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between bg-gray-50 rounded-md p-3">
                  <code class="text-sm text-gray-800 flex-1 text-left overflow-x-auto">{{
                    selectedInscription?.token
                  }}</code>
                  <button
                    type="button"
                    class="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    @click="copyToken"
                    :title="copied ? 'Copied!' : 'Copy to clipboard'"
                  >
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                <p v-if="copied" class="mt-2 text-sm text-green-600 animate-pulse">
                  Copied to clipboard!
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm transition-colors"
              @click="showModal = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Sample data - replace with actual API calls in production
const inscriptions = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref("");
const statusFilter = ref("all");
const dateRangeFilter = ref("all");

// Make sure these refs are properly defined
const showModal = ref(false);
const selectedInscription = ref(null);
const copied = ref(false);

// Add these to the script setup section, after the other refs
const profileDropdownOpen = ref(false);
const user = ref({
  name: "John Doe",
  email: "john.doe@example.com",
});

// Add this computed property
const userInitials = computed(() => {
  if (!user.value.name) return "?";
  return user.value.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
});

// User data (replace with actual authentication)
// const user = ref({
//   name: 'John Doe',
//   email: 'john.doe@example.com'
// });

// const userInitials = computed(() => {
//   const nameParts = user.value.name.split(' ');
//   return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
// });

// Navigation methods (replace with actual routing)
const navigateToProfile = () => {
  // In a real app, this would navigate to the profile page
  profileDropdownOpen.value = false;
  alert("Navigating to profile page");
};

const navigateToSettings = () => {
  // In a real app, this would navigate to the settings page
  profileDropdownOpen.value = false;
  alert("Navigating to settings page");
};

const logout = () => {
  // Close the dropdown
  profileDropdownOpen.value = false;

  // 1. Remove the authentication token
  localStorage.removeItem("auth_token"); // Remove token from localStorage
  sessionStorage.removeItem("auth_token"); // Also check sessionStorage

  // 2. Clear any other user data from storage
  localStorage.removeItem("user_data");

  // 3. Optional: Clear cookies if you're using them for auth
  // document.cookie.split(";").forEach(cookie => {
  //   const eqPos = cookie.indexOf("=");
  //   const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
  //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  // });

  // 4. Redirect to login page
  // If using Vue Router:
  window.location.href = "/"; // Fallback for any routing system

  // If you're using Vue Router, you could use this instead:
  // router.push('/');

  console.log("User logged out successfully");
};

// Generate sample data
onMounted(() => {
  generateSampleData();

  // Add click outside listener for profile dropdown
  document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("user-menu-button");
    if (dropdown && !dropdown.contains(event.target) && profileDropdownOpen.value) {
      profileDropdownOpen.value = false;
    }
  });
});

const generateSampleData = () => {
  const sampleData = [];
  for (let i = 1; i <= 57; i++) {
    const validated = Math.random() > 0.4;
    sampleData.push({
      id: `INS-${String(i).padStart(4, "0")}`,
      name: `Inscription ${i}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      validated: validated,
      token: validated && Math.random() > 0.3 ? generateRandomToken() : null,
    });
  }
  inscriptions.value = sampleData;
};

const generateRandomToken = () => {
  return (
    "tk_" +
    Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
  );
};

// Computed properties
const filteredInscriptions = computed(() => {
  let filtered = [...inscriptions.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter.value !== "all") {
    if (statusFilter.value === "validated") {
      filtered = filtered.filter((item) => item.validated);
    } else if (statusFilter.value === "pending") {
      filtered = filtered.filter((item) => !item.validated);
    } else if (statusFilter.value === "token-generated") {
      filtered = filtered.filter((item) => item.token);
    }
  }

  // Apply date filter
  if (dateRangeFilter.value !== "all") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (dateRangeFilter.value === "today") {
      filtered = filtered.filter((item) => item.date >= today);
    } else if (dateRangeFilter.value === "week") {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      filtered = filtered.filter((item) => item.date >= weekStart);
    } else if (dateRangeFilter.value === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter((item) => item.date >= monthStart);
    }
  }

  return filtered;
});

const paginatedInscriptions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredInscriptions.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const totalItems = computed(() => filteredInscriptions.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
);

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current > 3) {
      pages.push("...");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push("...");
    }

    pages.push(total);
  }

  return pages;
});

// Stats
const totalInscriptions = computed(() => inscriptions.value.length);
const validatedCount = computed(
  () => inscriptions.value.filter((item) => item.validated).length
);
const tokensGeneratedCount = computed(
  () => inscriptions.value.filter((item) => item.token).length
);

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const refreshData = () => {
  // In a real app, this would fetch fresh data from the API
  generateSampleData();
};

const validateInscription = (inscription) => {
  // In a real app, this would call an API to validate the inscription
  const index = inscriptions.value.findIndex((item) => item.id === inscription.id);
  if (index !== -1) {
    inscriptions.value[index].validated = true;
  }
};

const copyToken = async () => {
  if (selectedInscription.value?.token) {
    try {
      // Use the Clipboard API to copy the text
      await navigator.clipboard.writeText(selectedInscription.value.token);

      // Set copied state to true to show feedback
      copied.value = true;

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        copied.value = false;
      }, 2000);

      console.log("Token copied to clipboard:", selectedInscription.value.token);
    } catch (err) {
      console.error("Failed to copy token:", err);

      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = selectedInscription.value.token;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          copied.value = true;
          setTimeout(() => {
            copied.value = false;
          }, 2000);
          console.log("Fallback: Token copied to clipboard");
        } else {
          console.error("Fallback: Failed to copy token");
        }
      } catch (err) {
        console.error("Fallback: Failed to copy token:", err);
      }

      document.body.removeChild(textArea);
    }
  }
};

const generateToken = (inscription) => {
  // In a real app, this would call an API to generate a token
  const index = inscriptions.value.findIndex((item) => item.id === inscription.id);
  if (index !== -1) {
    // Generate the token
    const newToken = generateRandomToken();

    // Update the inscription in the array
    inscriptions.value[index] = {
      ...inscriptions.value[index],
      token: newToken,
    };

    // Set the selected inscription for the modal
    selectedInscription.value = inscriptions.value[index];

    // Reset copied state
    copied.value = false;

    // Show the modal
    showModal.value = true;

    console.log("Modal should be visible:", showModal.value);
    console.log("Selected inscription:", selectedInscription.value);
  }
};

const viewDetails = (inscription) => {
  // In a real app, this would navigate to a details page
  selectedInscription.value = inscription;
  showModal.value = true;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};
</script>

<style>
/* Add these styles to ensure the modal overlay works correctly */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-50 {
  z-index: 50;
}

/* Add a transition for the modal background */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Ensure the modal content appears above the overlay */
.relative {
  position: relative;
}

/* Add a transition for the modal background */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Add animation for copied text */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
