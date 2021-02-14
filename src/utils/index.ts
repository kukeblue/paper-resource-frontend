export function formatFileSize(fileSize:number) {
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < (1024*1024)) {
        let temp = fileSize / 1024;
        return temp.toFixed(2) + 'KB';
    } else if (fileSize < (1024*1024*1024)) {
        var temp = fileSize / (1024*1024);
        return temp.toFixed(2) + 'MB';
    } else {
        var temp = fileSize / (1024*1024*1024);
        return temp.toFixed(2) + 'GB';
    }
}

