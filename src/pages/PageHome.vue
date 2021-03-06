<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
          <q-item v-for="qweet in qweets" :key="qweet.id" class="qweet q-py-md">
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
                <q-btn
                  @click="toggleLiked(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  flat
                  round
                />
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
import db from "src/boot/firebase";
import { formatDistance, subDays } from "date-fns";

export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   id: "ID1",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!1",
        //   date: 1619997732270,
        //   liked: false
        // },
        // {
        //   id: "ID2",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!2",
        //   date: 1619997782248,
        //   liked: true
        // },
        // {
        //   id: "ID3",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ad ab explicabo quam magniadipisci accusantium voluptatem veniam! In debitis esse modi, aliquam quam dolores doloremque velit!3",
        //   date: 1619997794961,
        //   liked: false
        // },
      ],
    };
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false,
      };
      // this.qweets.unshift(newQweet);
      db.collection("qweets")
        .add(newQweet)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(qweet) {
      db.collection("qweets").doc(qweet.id).update({
          liked: !qweet.liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id; //getting a qweet id
          if (change.type === "added") {
            console.log("New qweet: ", qweetChange);
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange);
            let index = this.qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            Object.assign(this.qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", qweetChange);
            let index = this.qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            this.qweets.splice(index, 1);
          }
        });
      });
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