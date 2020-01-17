/* eslint-disable quote-props */
import {
  faPalette, faLaptop, faUserTie, faLaptopCode,
  faClipboardList, faBook, faBullseye, faHeartbeat,
  faMusic, faDumbbell,
} from '@fortawesome/free-solid-svg-icons';


const categoryLib: any = {
  'Development': faLaptopCode,
  'Business': faUserTie,
  'IT&Software': faLaptop,
  'Office Productivity': faClipboardList,
  'Personal Development': faBook,
  'Design': faPalette,
  'Health&Fitness': faHeartbeat,
  'Marketing': faBullseye,
  'Music': faMusic,
  'Sports': faDumbbell,
};

export { categoryLib as default };
