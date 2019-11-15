export default function contentHeight() {
  const navTop = document.querySelector('.nav--top');
  const navBottom = document.querySelector('.nav--bottom');

  const navTopHeight = navTop.getBoundingClientRect().height;
  const navBottomHeight = navBottom
    ? navBottom.getBoundingClientRect().height
    : 0;

  let { innerHeight } = window;

  document.documentElement.style.setProperty(
    '--content',
    `${innerHeight - navTopHeight - navBottomHeight}px`
  );
}
