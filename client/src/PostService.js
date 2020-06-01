import axios from 'axios';

const url = "api/posts/";

class PostService {
    // Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post
                    }))
                );
            } catch (err) {
                reject(err);
            }
        })
    }

    // Create Posts
    static insertPost(title, author, content) {
        console.log(title, author, content);
        return axios.post(url, {
            title,
            author,
            content
        });
    }

    // Delete Posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;