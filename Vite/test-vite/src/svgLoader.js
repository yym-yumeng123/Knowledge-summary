// import svgIcon from '@assets/images/drop.svg'


// 第一种加载 svg 的方式
// const svg = document.createElement('img')
// svg.src = svgIcon

// document.body.appendChild(svg)


// 第二种加载 svg 的方式
import svgRaw from '@assets/images/drop.svg?raw'
document.body.innerHTML = svgRaw

const svgElement = document.getElementsByTagName('svg')[0]
svgElement.onmouseenter = () => {
  svgElement.style.fill = 'red'
}