import {isEmpty} from "../commons/sr-commons.model";

export function downloadFile(file: Blob, fileName: string, url?: string): void {
  //é IE11 ou Edge
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    if (isEmpty(url)) {
      url = URL.createObjectURL(file);
    }
    // Chrome, Safari, Firefox, Opera
    const a: any = document.createElement("a");
    // Firefox exige que o link esteja no body
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    a.click();
    document.body.removeChild(a);
  }

}
