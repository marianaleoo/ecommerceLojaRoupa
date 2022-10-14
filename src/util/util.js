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



  export function alertMessageUtil(
    messages = [],
    show = false,
    title = "",
    variant = ""
  ) {
    return {
      messages,
      show,
      title,
      variant,
    };
  }

  export function handleErrorMessage(setState, error) {
    if (error.response?.data?.error) {
      setState({
        alert: alertMessageUtil(error.response?.data?.error.split(";;"), true),
      });
      return;
    }
    if (error.response?.data?.["Not Found"]) {
      setState({
        alert: alertMessageUtil(["Erro 404, registro não encontrado"], true),
      });
      return;
    }
  }  
  
  

  export function handleSetAlert(setState, messages, title, variant) {
    setState({
      alert: alertMessageUtil(messages, true, title, variant),
    });
  }