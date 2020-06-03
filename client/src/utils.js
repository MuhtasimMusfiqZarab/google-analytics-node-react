//this tells us if the user is on the mobile or not (as we want a responsive application)

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const isMobile = window.innerWidth <= 500;
