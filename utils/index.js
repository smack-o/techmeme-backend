// 处理响应信息
function handleRes(result, res) {
  if (result.error) {
    res.status(400).json({
      status: 400,
      msg: result.error,
    });
    return;
  }
  res.json({
    data: result,
    status: 200,
    msg: 'ok',
  });
}

module.exports = {
  handleRes,
};
