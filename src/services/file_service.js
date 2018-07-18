export default class FileService {
  readFiles(files) {
    return Array.from(files).map((file) => {
      const reader = new global.FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          file.data = event.target.result;
          resolve(file);
        };
        reader.onerror = error => reject(error);
        if (/^image/.test(file.type)) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      });
    });
  }
}
