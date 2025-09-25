// Vercel API route for handling Chinese URL rewriting
export default function handler(req, res) {
  const { path } = req.query;
  
  // Handle Chinese characters properly
  const chinesePaths = {
    '家居藥物回收計劃': '家居藥物回收計劃.html',
    '藥物分類搜尋引擎器': '藥物分類搜尋引擎器.html'
  };
  
  // Check if it's a known Chinese path
  if (chinesePaths[path]) {
    return res.redirect(302, `/${chinesePaths[path]}`);
  }
  
  // Default behavior - try to serve .html file
  return res.redirect(302, `/${path}.html`);
}
