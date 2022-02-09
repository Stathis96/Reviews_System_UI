<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Review System
        </q-toolbar-title>

          <!-- v-if="getUser !== null" -->
        <q-btn
          flat
          icon="logout"
          label="logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>

      <q-card-section horizontal >
        <q-card-section class="q-pt-sm" v-if="getUser">
          <div class="text-overline text-center text-italic">Logged-in User</div>
          <div class="text-h5 q-mt-sm q-mb-sm">{{ getUser.name }}</div>
          <div class="text-caption text-grey q-pb-md">
            {{ getUser.email}}
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator></q-separator>
        <q-item-label
          header
          class="text-grey-8 links text-italic"
        >
          Essential Links
        </q-item-label>
    <q-expansion-item
        :content-inset-level="1"
        expand-separator
        icon="rate_review"
        label="Interviews & Candidates"
        caption="Our Interviews"
        class="links"
      >
       <div class="text-weight-light text-align">
         <EssentialLink
          v-for="link in essentialLinksForInterviews"
          :key="link.title"
          v-bind="link"
        />
         </div>
      </q-expansion-item>

     <q-expansion-item
        :content-inset-level="1"
        expand-separator
        icon="group"
        label="Interns"
        caption="Our People"
        class="links"
      >
       <div class="text-weight-light text-align">
        <EssentialLink
          v-for="link in essentialLinksForInterns"
          :key="link.title"
          v-bind="link"
        />
        </div>
      </q-expansion-item>

     <q-expansion-item
        :content-inset-level="1"
        expand-separator
        icon="history"
        label="History"
        caption="Browse History"
        class="links"
      >
       <div class="text-weight-light text-align">
        <EssentialLink
          v-for="link in essentialLinksForHistory"
          :key="link.title"
          v-bind="link"
        />
       </div>
      </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksListForInterviews = [
  {
    title: 'Scheduled/Old Interviews',
    icon: 'reviews',
    link: '/interviews'
  },
  {
    title: 'All Interviews By Status',
    icon: 'pending_actions',
    link: '/pending'
  },
  {
    title: 'All Registered Candidates',
    icon: 'groups',
    link: '/candidates'
  }
]
const linksListForInterns = [
  {
    title: 'New/Old Interns',
    icon: 'person',
    link: '/oldnew'
  },
  {
    title: 'All Interns',
    icon: 'person',
    link: '/allinterns'
  }
]
const linksListForHistory = [
  {
    title: 'Statistics',
    // caption: 'All the stats',
    icon: 'analytics',
    link: '/stats'
  }
]

import { defineComponent, ref, onMounted } from 'vue'
import { authService } from '../boot/auth'
import { usersStore } from '../store/LoggedUser'
import { mapState } from 'pinia'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  computed: {
    ...mapState(usersStore, {
      getUser: 'getUser'
    })
  },

  setup () {
    const user = ref({ sub: '', name: '', email: '' })
    const store = usersStore()
    onMounted(() => {
      // console.log('did i log?')
      authService.getProfile()
        .then((res) => {
          // console.log('res from app vue is', res)
          // user.value = res as AuthUser
          user.value = store.$state.user
          if (res == null) {
            authService.login()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

    const leftDrawerOpen = ref(false)

    return {
      essentialLinksForInterviews: linksListForInterviews,
      essentialLinksForInterns: linksListForInterns,
      essentialLinksForHistory: linksListForHistory,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    logout () {
      authService.logout()
      // this.isUserLogged.value = !this.isUserLogged.value
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');
.links {
  font-family: 'Noto Serif', serif;
}
</style>
