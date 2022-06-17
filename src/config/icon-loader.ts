import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faChevronDown,
  faChevronLeft,
  faSpinner,
  faTemperatureHalf,
  faX,
} from '@fortawesome/free-solid-svg-icons';

export const loadIcons = () => {
  library.add(
    faChevronDown,
    faChevronLeft,
    faSpinner,
    faTemperatureHalf,
    faX,
  );
};
