export function updateStateValue(state, path, value) {
    path = path.split(".");
    let root = state[path[0]];
    let i = 0;
    for (i; i < path.length - 1; i++) {
      state = state[path[i]];
    }
    state[path[i]] = value;
    return { [path[0]]: root };
  }