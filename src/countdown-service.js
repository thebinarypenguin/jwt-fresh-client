
const createCountdown = function (fn, ms) {

  let active = false;
  let timeout;

  const action = () => {
    console.log('Killer: kill');
    fn();
    active = false;
  };

  const start = function () {
    console.log('Killer: start');

    active = true;
    timeout = setTimeout(action, ms);
  };

  const stop = function () {
    console.log('Killer: stop');

    active = false;
    clearTimeout(timeout);
  };

  const reset = function () {

    if (active) {
      console.log('Killer: reset');

      clearTimeout(timeout);
      timeout = setTimeout(action, ms);
    }
  };


  return {
    start,
    stop,
    reset,
  };
};

export default {
  createCountdown,
}
