const feedback = require('./feedback.js');

// 确保只处理API请求
module.exports = async (req, res) => {
  // 增加API路径验证
  if (!req.url.startsWith('/api/')) {
    return res.status(404).json({ error: 'API路径不存在' });
  }
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 处理反馈请求
  if (req.url === '/api/feedback' || req.url === '/api/') {
    return feedback(req, res);
  }
  
  return res.status(404).json({ error: 'API端点不存在' });
};