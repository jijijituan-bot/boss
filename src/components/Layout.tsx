import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
  import { cn } from '@/lib/utils';
  import { motion } from 'framer-motion';
  import ChatDialog from './ChatDialog';
  import FeedbackDialog from './FeedbackDialog';

// Navigation items for the main menu
const navItems = [
  { label: '首页', path: '/' },
  { label: '走进我们', path: '/about' },
  { label: '产品中心', path: '/products' },
  { label: '生产能力', path: '/production-capacity' },
  { label: '咨询中心', path: '/consultation' },
  { label: '联系我们', path: '/contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const location = useLocation();

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // 添加全局事件监听以从其他组件打开聊天对话框
  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
    };
    
    window.addEventListener('openChat', handleOpenChat);
    return () => {
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, [setIsChatOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation Bar */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
               <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <img 
                    src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/LOGO_20250807094246.png" 
                    alt="博视科技logo" 
                    className="w-full h-full object-contain"
                  />
               </div>
               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                博视科技
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  item.label === "咨询中心" ? (
                    <button
                      key={item.path}
                      onClick={() => setIsChatOpen(true)}
                      className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-700"
                    >
                      {item.label}
                    </button>
                  ) : item.label === "联系我们" ? (
                    <button
                      key={item.path}
                      onClick={() => setIsFeedbackOpen(true)}
                      className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-700"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-blue-600",
                        location.pathname === item.path ? "text-blue-600" : "text-gray-700"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
            </nav>

            {/* Contact Button */}
             <div className="hidden md:block">
               <button
                 onClick={() => setIsChatOpen(true)}
                 className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
               >
                 专属顾问
                 <i className="fa-solid fa-comments ml-2"></i>
               </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <i className="fa-solid fa-times text-xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-xl"></i>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  咨询顾问
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                   <img src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/LOGO_20250807094816.png" alt="博视科技logo" className="w-full h-full object-contain" />
                 </div>
                <span className="text-xl font-bold text-white">博视科技</span>
              </div>
              <p className="text-gray-400 mb-4">
                创新赢得尊重 · 科技引领未来
              </p>
              <p className="text-gray-400 text-sm">
                深圳市博视科技有限公司是一家专注于自动化设备研发与制造的高新技术企业。
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    {item.label === "咨询中心" ? (
                      <button 
                        onClick={() => setIsChatOpen(true)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <i className="fa-solid fa-map-marker-alt text-blue-400 mt-1 mr-3"></i>
                   <span className="text-gray-400">深圳市龙华区龙华街道富康社区</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-phone text-blue-400 mr-3"></i>
                   <span className="text-gray-400">0755-23775783/29577459</span>
                </li>
    <li className="flex items-center">
      <i className="fa-solid fa-envelope text-blue-400 mr-3"></i>
      <span className="text-gray-400">boshikejiyouxiangongsi@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">关注我们</h3>
               <div className="flex space-x-4 mb-4">
                  {/* 微信图标 */}
                  <div className="relative group">
                    <a href="#" className="w-[40px] h-[40px] rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <i className="fa-brands fa-weixin text-white"></i>
                    </a>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      敬请期待！
                    </div>
                  </div>
                  
                  {/* 微博图标 */}
                  <div className="relative group">
                    <a href="#" className="w-[40px] h-[40px] rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <i className="fa-brands fa-weibo text-white"></i>
                    </a>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      敬请期待！
                    </div>
                  </div>
                  
                  {/* LinkedIn图标 */}
                  <div className="relative group">
                    <a href="#" className="w-[40px] h-[40px] rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <i className="fa-brands fa-linkedin text-white"></i>
                    </a>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      敬请期待！
                    </div>
                  </div>
                </div>
              <p className="text-gray-400 text-sm">
                订阅我们的 newsletter 获取最新产品和技术资讯
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2025 深圳市博视科技有限公司. 保留所有权利.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">隐私政策</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">服务条款</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">网站地图</a>
              </div>
            </div>
           </div>
         </div>
       </footer>
        <ChatDialog 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
        <FeedbackDialog
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
     </div>
   );
 }