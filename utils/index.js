// 处理响应信息
function handleRes(result, res) {
  if (result.error) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  res.json(result);
}

module.exports = {
  handleRes,
};
