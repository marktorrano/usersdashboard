<template>
  <div class="users page">
    <div class="user__heading">
      <h3>Users</h3>
      <div class="user__filters">
        <div class="user__filter">
          <label>Search</label>
          <input type="text" name="search" v-model="search">
        </div>
        <div class="user__filter">
          <label>Sort By</label>
          <select name="sort" v-model="sortKey">
            <option v-for="sortKey in sortKeys"
                    :key="sortKey"
                    :value="sortKey"
            >{{sortKey}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="user__list">
      <div v-for="(user, index) in orderBy(filterBy(users, search), sortKey)"
           class="user"
           :key="index">
        <div class="user__thumbnail"></div>
        <div class="user__details">
          <div class="user__info">
            <div class="user__name">{{user.name}}</div>
            <div class="user__username">{{user.username}}</div>
          </div>
          <router-link class="user__email" :to="{ name: 'User Details', params: { id: user.id} }">{{user.email}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue2Filters from "vue2-filters";

  export default {
    name: 'User',
    mixins: [Vue2Filters.mixin],
    data() {
      return {
        dataSet: [],
        sortKey: 'name',
        search: '',
        sortKeys: [
          'name',
          'email',
          'username',
        ]
      };
    },
    mounted() {
      this.showUsers()
    },
    computed: {
      users() {
        return this.dataSet ? this.dataSet.data : [];
      }
    },
    methods: {
      async showUsers() {
        this.dataSet = await axios.get('http://jsonplaceholder.typicode.com/users',
    {
            headers: {
              'Accept': 'application/json',
            },
          }
        );
      }
    },
  };
</script>

<style lang="scss" scoped>
.page {
  max-width: 1440px;
  margin: 0 auto;
}

.user__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.user__filters {
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
}

.user__filter {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0;
  }
}

.user__list {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.user {
  border-top: 1px solid #ddd;
  display: flex;
  padding: 1rem;
  align-items: center;
}

.user:last-child {
  border-bottom: 1px solid #ddd;
}

.user__thumbnail {
  background: #aaa;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.user__details {
  flex: 1;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

</style>
