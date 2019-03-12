
const createCountdown = function (fn, ms) {

  let active = false;
  let timeout;

  const action = () => {
    fn();
    active = false;
  };

  const start = function () {
    console.log('start');

    active = true;
    timeout = setTimeout(action, ms);
  };

  const stop = function () {
    console.log('stop');

    active = false;
    clearTimeout(timeout);
  };

  const reset = function () {

    if (active) {
      console.log('reset');

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
