class File {
    constructor(app) {
        this.app = app;

        this.model =  {
            name: null,
            originName: null,
            mimetype: null,
            size: null,
            created: Date.now()
        }
    }

    initWithObject(fileObject) {
        this.model.name = fileObject.filename;
        this.model.originName = fileObject.originalname;
        this.model.mimetype = fileObject.mimetype;
        this.model.size = fileObject.size;
        this.model.created = Date.now();

        return this.model;
    }

    save(cb) {
        const db = this.app.get('db');
        db.collection('files').insertOne(this.model, (err, reuslt) => {
                return cb(err, reuslt);
        });
    }
}

module.exports = File;