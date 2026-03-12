import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function FeedbackDialog({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟API提交
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      // 重置表单
      setFormData({ name: '', email: '', message: '' });
      // 3秒后关闭对话框
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('提交反馈失败:', error);
      alert('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        {/* 对话框头部 */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">用户反馈</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="关闭对话框"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-check text-3xl text-green-600"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">反馈提交成功！</h4>
              <p className="text-gray-600">感谢您的宝贵反馈，我们会尽快处理并与您联系。</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center mb-4">
                {/* 带动画的客服头像 */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="relative mb-4"
                >
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa-solid fa-user-tie text-4xl text-blue-600"></i>
                  </div>
                  {/* 状态指示器 */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                  </div>
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900">您好！我是客服小博</h4>
                <p className="text-gray-500 text-sm">有什么可以帮助您的吗？</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">反馈内容</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="请详细描述您的问题或建议..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      提交中...
                    </>
                  ) : (
                    <>
                      提交反馈
                      <i className="fa-solid fa-paper-plane ml-2"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}