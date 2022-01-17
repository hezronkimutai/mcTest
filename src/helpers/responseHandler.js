export default (res, message, status, data) => {
  const msg = status < 200 || status > 300 ? { error: message } : { success: message };
  return res.status(status).json({
    ...msg,
    data,
  });
};
