const createKiller = function (storage, key) {

  let timeout;

  const kill = function () {
    storage.removeItem(key);
  };

  const start = function () {

    timeout = setTimeout(kill, 10 * 1000);
  };

  const stop = function () {
    clearTimeout(timeout)
  };

  const reset = function () {
    stop();
    start();
  };

  return {
    start,
    stop,
    reset,
  };
};

export default {
  createKiller,
};
