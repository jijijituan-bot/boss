import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('提交成功，我们将尽快与您联系');
      
      // 3秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('提交反馈失败:', error);
      toast.error('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              人工通道
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">联系我们</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              如有任何问题或需求，请通过以下方式联系我们，我们的专业团队将为您提供优质服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* 联系信息 */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">联系方式</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                      <i className="fa-solid fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">公司地址</h3>
                       <p className="text-gray-600">深圳市龙华区龙华街道富康社区</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                      <i className="fa-solid fa-phone text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">联系电话</h3>
                       <p className="text-gray-600">0755-23775783/29577459</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                      <i className="fa-solid fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">电子邮箱</h3>
                      <p className="text-gray-600">info@boshi-tech.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                      <i className="fa-solid fa-clock text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">工作时间</h3>
                      <p className="text-gray-600">周一至周五: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-6 text-gray-900">关注我们</h2>
                 <div className="flex space-x-4">
                   {/* 微信图标 */}
                   <div className="relative group">
                     <a href="#" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                       <i className="fa-brands fa-weixin text-xl"></i>
                     </a>
                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                       敬请期待！
                     </div>
                   </div>
                   
                   {/* 微博图标 */}
                   <div className="relative group">
                     <a href="#" className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                       <i className="fa-brands fa-weibo text-xl"></i>
                     </a>
                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                       敬请期待！
                     </div>
                   </div>
                   
                   {/* LinkedIn图标 */}
                   <div className="relative group">
                     <a href="#" className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                       <i className="fa-brands fa-linkedin text-xl"></i>
                     </a>
                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                       敬请期待！
                     </div>
                   </div>
                 </div>
              </div>
            </div>
            
            {/* 联系表单 */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">发送消息</h2>
                
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fa-solid fa-check text-3xl text-green-600"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h3>
                    <p className="text-gray-600">感谢您的留言，我们会尽快与您联系</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="请输入您的联系电话"
                        />
                      </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="请输入您的邮箱地址"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="请详细描述您的问题或需求..."
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
                          提交留言
                          <i className="fa-solid fa-paper-plane ml-2"></i>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}