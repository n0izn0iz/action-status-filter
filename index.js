const {Toolkit} = require("actions-toolkit");

const init = tools => {
  const argsList = tools.arguments._;
  if (argsList.length < 1)
    tools.exit.failure("Invalid action usage: context argument required");
  return {
    statusContext: argsList[0],
    statusState: argsList.length < 2 ? "success" : argsList[1]
  };
};

Toolkit.run(
  async tools => {
    const {statusContext, statusState} = init(tools);
    const payload = tools.context.payload;

    tools.log("Status payload:", payload);
    tools.log("Required status context:", statusContext);
    tools.log("Required status state:", statusState);

    if (payload.context !== statusContext)
      tools.exit.neutral("Invalid status context", payload.context);

    if (payload.state !== statusState)
      tools.exit.neutral("Invalid status state", payload.state);

    tools.exit.success("Done:", statusContext, statusState, "confirmed");
  },
  {event: "status"}
);
