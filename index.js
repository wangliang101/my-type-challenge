const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.resolve(__dirname, 'challenges'));

const options = { filter: '' };

// 判断文件夹是否存在
const isFileExisted = (path) => {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// 创建文件/文件夹
const mkdir = (path) => {
  return new Promise((resolve) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        resolve({ status: false, errorMsg: err });
      } else {
        resolve({ status: true });
      }
    });
  });
};

// 移动文件
const moveFile = (sourceFilePath, targetFilePath) => {
  console.log(sourceFilePath, targetFilePath);
  return new Promise((resolve) => {
    fs.renameSync(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        resolve({ status: false, errorMsg: err });
      } else {
        resolve({ status: true });
      }
    });
  });
};

const moveFolder = async (sourceFolderPath, targetFolderPath) => {
  // 判断目标文件夹是否存在，不存在则创建
  const targetFilestatus = await isFileExisted(targetFolderPath);
  if (!targetFilestatus) {
    console.error('目标文件夹不存在，即将创建...');
    const { status: newFolderStatus, errorMsg: newFolderErrMsg } = await mkdir(targetFolderPath);
    if (!newFolderStatus) {
      console.error('创建文件夹失败，请重试，错误信息：', newFolderErrMsg);
      return;
    } else {
      console.log('目标文件重建成功');
    }
  }

  return new Promise((resolve) => {
    fs.readdir(sourceFolderPath, (err, fileNameList) => {
      if (err) {
        resolve({ status: false, errorMsg: err });
      } else {
        console.log(121212, sourceFolderPath);
        fileNameList.forEach(async (fileName) => {
          if (options.filter === '' || path.extname(fileName) === options.filter) {
            const sourceStat = fs.lstatSync(`${sourceFolderPath}/${fileName}`);
            if (sourceStat.isFile()) {
              const { status: fileMoveStatus, errorMsg: fileMoveErrMsg } = await moveFile(
                `${sourceFolderPath}/${fileName}`,
                `${targetFolderPath}/${fileName}`
              );
              if (!fileMoveStatus) {
                console.error(`${sourceFolderPath}/${fileName}移动失败：${fileMoveErrMsg}`);
              }
            } else if (sourceStat.isDirectory()) {
              moveFolder(`${sourceFolderPath}/${fileName}`, `${targetFolderPath}/${fileName}`);
            } else {
              console.error('未知情况，请排查');
            }
          }
        });
        fs.rmdir(sourceFolderPath, (err) => {
          if (err) console.log('删除文件夹失败', err);
        });
        resolve({ status: true });
      }
    });
  });
};

files.forEach((file) => {
  if (file.split('-').length > 1) {
    const fileArr = file.split('-');
    fileArr.shift();

    moveFolder(
      path.resolve(__dirname, 'challenges', file),
      path.resolve(__dirname, 'challenges', file.split('-')[1], file)
    );
  }
});
