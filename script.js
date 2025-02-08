const ecgLine = document.querySelector('.ecg-line');
const arrow = document.querySelector('.arrow');

let isAnimating = false; // 标记是否正在动画


const path = [];
const numPoints = 150; // 点的数量
const containerWidth = window.innerWidth; // 屏幕宽度
const pointSpacing = containerWidth / numPoints; // 每两个点的水平间距

for (let i = 0; i < numPoints; i++) {
  path.push(0); // 随机生成点的 Y 偏移
}

// 创建平稳的心电图路径
const createFlatPath = () => {
  for (let i = 0; i < numPoints - 1; i++) {
    path[i] = path[i + 1];
  }
  path[numPoints - 1] = 0;
  return path;
};

// 创建波动的心电图路径
const createWavePath = () => {
  for (let i = 0; i < numPoints - 1; i++) {
    path[i] = path[i + 1];
  }

  path[numPoints - 6] = -76 + Math.random() * 15;
  path[numPoints - 5] = 100 + Math.random() * 15;
  path[numPoints - 4] = 25 + Math.random() * 15;
  path[numPoints - 3] = 0 + Math.random() * 15 - 7;
  path[numPoints - 2] = -100 + Math.random() * 15;
  path[numPoints - 1] = -25 + Math.random() * 15;

  return path;
};

// 生成SVG路径
const generateECG = (path) => {
  let d = '';
  path.forEach((point, index) => {
    const x = index * pointSpacing; // 根据屏幕宽度计算 X 坐标
    const y = 100 + point*3; // Y 坐标以 100 为基准
    d += `${index === 0 ? 'M' : 'L'}${x},${y} `;
  });
  return d;
};

// 更新心电图路径
const updateECG = (isWave) => {
  const pathData = isWave ? createWavePath() : createFlatPath();
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  const path = document.createElementNS(svgNS, 'path');

  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${containerWidth} 200`); // 定义视图框大小

  path.setAttribute('d', generateECG(pathData));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#0f0');
  path.setAttribute('stroke-width', '2');

  svg.appendChild(path);
  ecgLine.innerHTML = ''; // 清空当前动画
  ecgLine.appendChild(svg);
};
isAlive = true;
// 初始化心电图为静止
updateECG(isAlive);
ecgLine.style.display='block';
// 监听按键事件
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (key === 'b' && !isAnimating) {
    arrow.style.display = 'none'; // 隐藏箭头
    ecgLine.style.display = 'block'; // 显示心电图
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.down-arrow').style.display = 'none'; // 显示向下箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
    updateECG(true); // 触发波动
  } else if (key === 'd') {
    ecgLine.style.display = 'none'; // 隐藏心电图
    arrow.style.display = 'block'; // 显示向下箭头
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
  } else if (key === 'l') {
    ecgLine.style.display = 'none'; // 隐藏心电图
    document.querySelector('.down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.left-down-arrow').style.display = 'block'; // 显示左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
  } else if (key=='r'){
    ecgLine.style.display = 'none'; // 隐藏心电图
    document.querySelector('.down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'block'; // 显示右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
  }
  else if (key=='c'){
    ecgLine.style.display = 'none'; // 隐藏心电图
    document.querySelector('.down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.correct').style.display = 'block'; // 显示上箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
  }
  else if (key=='w'){
    ecgLine.style.display = 'none'; // 隐藏心电图
    document.querySelector('.down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'block'; // 显示上箭头
    document.querySelector('.smile').style.display = 'none'; // 隐藏向下箭头
  }
  else if (key=='s'){
    ecgLine.style.display = 'none'; // 隐藏心电图
    document.querySelector('.down-arrow').style.display = 'none'; // 隐藏向下箭头
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.smile').style.display = 'block'; // 显示向下箭头
  }
  else if (key=='a'){
    arrow.style.display = 'none'; // 隐藏箭头
    ecgLine.style.display = 'block'; // 显示心电图
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.down-arrow').style.display = 'none'; // 显示向下箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
    isAlive = true;
  }
  else if (key=='z'){
    arrow.style.display = 'none'; // 隐藏箭头
    ecgLine.style.display = 'block'; // 显示心电图
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.down-arrow').style.display = 'none'; // 显示向下箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
    isAlive = false;
  }else if (key === 'v') {
    // 隐藏其他内容
    ecgLine.style.display = 'none';
    document.querySelectorAll('.arrow, .correctandwrong, .smile').forEach((el) => {
      el.style.display = 'none';
    });

    // 显示视频并播放
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.ecg-video');

    videoContainer.style.display = 'block'; // 显示视频容器
    video.play(); // 播放视频
  }
  else{
    arrow.style.display = 'none'; // 隐藏箭头
    ecgLine.style.display = 'block'; // 显示心电图
    document.querySelector('.left-down-arrow').style.display = 'none'; // 隐藏左下箭头
    document.querySelector('.right-down-arrow').style.display = 'none'; // 隐藏右下箭头
    document.querySelector('.correct').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.wrong').style.display = 'none'; // 隐藏上箭头
    document.querySelector('.down-arrow').style.display = 'none'; // 显示向下箭头
    document.querySelector('.smile').style.display = 'none'; // 显示向下箭头
  }
});

// 持续更新心电图为静止状态
setInterval(() => {
  if (ecgLine.style.display === 'block') {
    updateECG(false);
  }
}, 10);
setInterval(() => {
    if (ecgLine.style.display === 'block') {
      updateECG(isAlive);
    }
  }, 500);
