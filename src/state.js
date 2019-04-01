let state = {};
const listenerCallbacks = [];

export function get() {
  return state;
}

export function append(newState) {
  state = { ...state, ...newState };
  // Notify of change
  listenerCallbacks.forEach(function(callback) {
    callback();
  });
}

export function addListenerCallback(callback) {
  listenerCallbacks.push(callback);
}
