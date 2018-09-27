import { Calendar } from 'calendar';

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const now = new Date();

export default () => {
  const DOM = {
    output: document.getElementById('Output'),
    nav: document.getElementById('Nav'),
    left: document.getElementById('Left'),
    center: document.getElementById('Center'),
    right: document.getElementById('Right'),
    next: document.getElementById('Next'),
    prev: document.getElementById('Prev'),
  };

  const STATE = {
    year: now.getFullYear(),
    month: now.getMonth(),
  };

  const CALENDAR = new Calendar;

  const render = ({ year, month }) => {
    const name = MONTHS[month];
    const weeks = [
      ['s', 'm', 't', 'w', 't', 'f', 's'],
      ...CALENDAR.monthDays(year, month)
    ];

    DOM.output.innerHTML = `
      <div>${name}${year}</div>
      <div class='Month'>
        ${weeks.map(days => `
          <div class='Week'>
            ${days.map(day => `<!--
              --><span class='Day'><!--
                -->${day !== 0 ? day : ''}<!--
              --></span><!--
            -->`).join('')}
          </div>
        `).join('')}
      </div>
    `;
  };

  render(STATE);

  const align = (alignment) => {
    ['left', 'center', 'right'].forEach(direction => {
      DOM[direction].setAttribute('data-active', alignment === direction);
    });

    DOM.nav.classList = `Nav Nav--${alignment}`;
    DOM.output.classList = `Output--${alignment}`;
  };

  DOM.left.addEventListener('click', (e) => {
    e.preventDefault();
    align('left');
  });

  DOM.center.addEventListener('click', (e) => {
    e.preventDefault();
    align('center');
  });

  DOM.right.addEventListener('click', (e) => {
    e.preventDefault();
    align('right');
  });

  align('left');

  DOM.next.addEventListener('click', (e) => {
    e.preventDefault();

    if (STATE.month === 11) {
      STATE.month = 0;
      STATE.year = STATE.year + 1;
    } else {
      STATE.month = STATE.month + 1;
    }

    render(STATE);
  });

  DOM.prev.addEventListener('click', (e) => {
    e.preventDefault();

    if (STATE.month === 0) {
      STATE.month = 11;
      STATE.year = STATE.year - 1;
    } else {
      STATE.month = STATE.month - 1;
    }

    render(STATE);
  });
};
