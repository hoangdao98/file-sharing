export class State {
    pending: boolean;
    uploading: boolean;
    uploadSuccess: boolean;

    constructor() {
        this.pending = true;
        this.uploading = false;
        this.uploadSuccess = false;
    }
}
