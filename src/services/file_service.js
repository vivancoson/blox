import JSZip from 'jszip';

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
  makeArchive(fileName, workflowYaml, blocks) {
    const zip = new JSZip();
    zip.file(fileName, workflowYaml);
    blocks.filter(e => Object.keys(e.editables).length).forEach(({ editables, fields }) => {
      for (const key in editables) {
        if ({}.hasOwnProperty.call(editables, key)) {
          if ({}.hasOwnProperty.call(fields, key)) {
            const editableName = fields[key].trim();
            const editableValue = editables[key].value;
            if (editableValue.trim().length && editableName.length) {
              zip.file(editableName, editableValue);
            }
          }
        }
      }
    });
    return zip.generateAsync({ type: 'blob' });
  }
}
