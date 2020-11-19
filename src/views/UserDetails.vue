<template>
  <div class="page">
    <div class="breadcrumbs">
      <router-link :to="{ name: 'User Listing' }">Users</router-link>
      <span class="userDetails__name" v-if="userName">&gt; {{userName}}</span>
    </div>
    <div class="userDetails">
      <div class="userDetails__content">
        <h4>Contact Info</h4>
        <div class="userDetails__username">
          <label class="userDetails__label">Username: </label>
          <span class="userDetails__value">{{userData.username}}</span>
        </div>
        <div class="userDetails__email">
          <label class="userDetails__label">Email: </label>
          <a class="userDetails__value" :href="`mailto:${userData.email}`">{{userData.email}}</a>
        </div>
        <div class="userDetails__phone">
          <label class="userDetails__label">Phone: </label>
          <a class="userDetails__value" :href="`tel:${userData.phone}`">{{userData.phone}}</a>
        </div>
        <div class="userDetails__website">
          <label class="userDetails__label">Website: </label>
          <a class="userDetails__value" :href="`//${userData.website}`" target="_blank">{{userData.website}}</a>
        </div>
      </div>
      <div class="userDetails__content">
        <h4>Address</h4>
        <span class="userDetails__address">{{userData.address | addressFormat}}</span>
      </div>
      <div class="userDetails__content">
        <h4>Company</h4>
        <div class="userDetails__companyName" v-if="userData.company">{{userData.company.name}}</div>
        <div class="userDetails__companyBs" v-if="userData.company">{{userData.company.bs}}</div>
        <div class="userDetails__companyCatchPhrase" v-if="userData.company">&quot;{{userData.company.catchPhrase}}&quot;</div>
      </div>
    </div>
    <div class="userPosts__container" v-if="userPosts">
      <div class="userPosts__heading">
        <h3>Posts by {{ userName }}</h3>
      </div>
      <div class="userPosts">
        <div class="userDetails__content" v-for="(post, index) in userPosts" :key="index">
          <div class="userPosts__title">{{ post.title }}</div>
          <div class="userPosts__body">{{ post.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'User',
  data() {
    return {
      userData: [],
      userPosts: [],
      userId: this.$route.params.id
    };
  },
  mounted() {
    this.getUserDetails();
    this.getUserPosts();
  },
  computed: {
    userName() {
      return this.userData ? this.userData.name : '';
    },
  },
  methods: {
    async getUserDetails() {
      const userData = await axios.get(`http://jsonplaceholder.typicode.com/users/${this.userId}`,
  {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      this.userData = userData.data || [];
    },
    async getUserPosts() {
       const userPostsData = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${this.userId}`,
  {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      this.userPosts = userPostsData.data || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  max-width: 1440px;
  margin: 0 auto;
}

.breadcrumbs {
  font-size: 1.5rem;
}

.userDetails__name {
  margin: 0 0.5rem;
}

.userDetails,
.userPosts {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    justify-content: space-around;
  }

  .userDetails__content {
    @media (max-width: 768px) {
      border: 0;
    }

    @media (max-width: 1024px) {
      width: 100%
    }
  }
}

.userDetails__content {
  border: 1px solid #333;
  width: 30%;
  padding: 1rem;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 100%;
    border: 0;
  }

  @media (max-width: 1024px) {
    width: 25%;
  }
}

.userDetails__companyCatchPhrase {
  font-style: italic;
}

.userPosts__title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
}

.userPosts__container {
  border-top: 1px solid #ddd;

  .userDetails__content {
    width: 30%;

    @media (max-width: 768px) {
      border: 0;
      border-bottom: 1px solid #333;
    }

    @media (max-width: 1024px) {
      width: 100%;
    }
  }
}

</style>
