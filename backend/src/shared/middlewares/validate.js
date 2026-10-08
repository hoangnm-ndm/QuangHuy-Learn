const REQUEST_PARTS = ["body", "query", "params"];

export const validate = (schemas) => (req, res, next) => {
  const validated = {};
  const issues = [];
  for (const part of REQUEST_PARTS) {
    if (!schemas[part]) continue;
    const result = schemas[part].safeParse(req[part]);
    if (result.success) validated[part] = result.data;
    else issues.push(...result.error.issues);
  }
  if (issues.length > 0)
    return res.status(400).json({ message: "Validation error", issues });
  req.validated = validated;
  next();
};
