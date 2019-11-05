const archiver = require('archiver'),
      path = require('path');


class fileArchiver {
    constructor(app, files = [], res) {
        this.app = app;
        this.files = files;
        this.res = res;
    }

    download() {
        const uploadDir = this.app.get('storage');
        const zip = archiver('zip');
        const response = this.res.attachment('download.zip');
        zip.pipe(response);

        this.files.forEach(f => {
            const filePath = path.join(uploadDir, f.name);
            zip.file(filePath, { name: f.originalName});
        });

        zip.finalize();

        return this;
    }
}

module.exports = fileArchiver;
