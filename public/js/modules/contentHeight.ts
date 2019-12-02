export default function contentHeight() {
  const navTop = document.querySelector<HTMLElement>('.nav--top');
  const navBottom = document.querySelector<HTMLElement>('.nav--bottom');

  if (navTop) {
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
}
