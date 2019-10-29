class Post {
    constructor(app) {
        this.app = app;

        this.model = {
            to: null,
            subject: null,
            message: null,
            files: [],
            created: Date.now()
        }
    }

    initWithObject(postData) {
        this.model.to = postData.to;
        this.model.subject = postData.subject;
        this.model.message = postData.message;
        this.model.files = postData.files;
        this.created = Date.now();

        return this.model;
    }
}

module.exports = Post;