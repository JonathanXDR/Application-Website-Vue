import json from '@/assets/data/data.json';
import ProgressBar from 'progressbar.js';

export default {
  name: 'CardTile',
  components: {},
  props: ['card'],
  data() {
    return {
      data: json,
    };
  },
  // created() {
  //   const bar = new ProgressBar.Path('#hex-progress-bar', {
  //     color: '#aaa',
  //     // This has to be the same size as the maximum width to
  //     // prevent clipping
  //     strokeWidth: 4,
  //     trailWidth: 1,
  //     easing: 'easeInOut',
  //     duration: 1400,
  //     text: {
  //       autoStyleContainer: false,
  //     },
  //     from: { color: '#aaa', width: 1 } as any,
  //     to: { color: '#333', width: 4 } as any,
  //     // Set default step function for all animate calls
  //     step: function (state: any, circle: any) {
  //       circle.path.setAttribute('stroke', state.color);
  //       circle.path.setAttribute('stroke-width', state.width);

  //       const value = Math.round(circle.value() * 100);
  //       if (value === 0) {
  //         circle.setText('');
  //       } else {
  //         circle.setText(value);
  //       }
  //     },
  //   }) as any;
  //   bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  //   bar.text.style.fontSize = '2rem';

  //   bar.animate(1.0); // Number from 0.0 to 1.0
  // },
};
