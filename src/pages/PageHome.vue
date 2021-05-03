<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md">
        <q-input
          class="new-qweet"
          bottom-slots
          v-model="newQweetContent"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>

          <template v-slot:after>
            <q-btn
              @click="addNewQweet"
              :disable="!newQweetContent"
              unelevated
              no-caps
              rounded
              color="primary"
              label="Qweet"
            />
          </template>
        </q-input>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >
          <q-item
            v-for="qweet in qweets"
            :key="qweet.date"
            class="qweet q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Siphenkosi Salman</strong>
                <span class="text-grey-7"
                  >@Siphera_iv <br class="lt-md" />&bull;
                  {{ qweet.date | relativeDate }}</span
                >
              </q-item-label>
              <q-item-label class="queet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                  flat
                  round
                />
                <q-btn color="grey" size="sm" icon="far fa-heart" flat round />
                <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance, subDays } from "date-fns";

export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!1",
          date: 1619997732270,
        },
        {
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!2",
          date: 1619997782248,
        },
        {
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!3",
          date: 1619997794961,
        },
      ],
    };
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
      };
      this.qweets.unshift(newQweet);
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      let dateToDelete = qweet.date;
      let index = this.qweets.findIndex((qweet) => qweet.date === dateToDelete);
      this.qweets.splice(index, 1);
    },
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 i !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.queet-content
  white-space: pre-line

.qweet-icons
  margin-left: -5px

.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>