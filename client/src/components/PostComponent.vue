<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <input type="text" v-model="title" placeholder="Title" />
      <input type="text" v-model="author" placeholder="Author" />
      <br />
      <input type="text" v-model="content" placeholder="Write About Something..." />
      <button v-on:click="createPost">Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <h2>{{post.title}}</h2>
        <button class="delete" v-on:click="deletePost(post._id)">Delete</button>
        <p class="author">By: {{ post.author }}</p>
        <p class="content">{{post.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      content: "",
      title: "",
      author: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.title, this.author, this.content);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 10px;
}

p.author {
  font-size: 14px;
  font-weight: 500;
  color: darkgray;
}

p.content {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0;
}
</style>
