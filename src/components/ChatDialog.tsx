import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatDialog({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 模拟API调用获取AI回复
  const getAIResponse = async (question: string): Promise<string> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟不同问题的专业回复
    const responses = {
      "产品信息": "博视科技提供多种自动化设备，包括非标定制自动化设备、自动化模组加工及组装、精密金属件加工和检测设备等。我们的产品广泛应用于电子、汽车、医疗等行业。",
      "技术支持": "我们的技术支持团队可提供7×24小时服务。您可以通过电话(400-123-4567)或邮件(boshikejiyouxiangongsi@gmail.com)联系我们，也可以通过当前对话框获取即时帮助。",
      "价格咨询": "我们的产品价格根据配置和定制需求有所不同。请提供您感兴趣的产品型号和具体需求，我们的销售顾问将为您提供详细报价。",
      "售后服务": "博视科技提供完善的售后服务，包括安装调试、操作培训、定期维护和故障排除等。我们在全国多个城市设有服务中心，可快速响应客户需求。",
      "默认": "感谢您的咨询。博视科技是一家专注于自动化设备研发与制造的高新技术企业。如果您有具体问题，请详细描述，我们将为您提供专业解答。"
    };
    
    // 简单关键词匹配
    if (question.includes("产品") || question.includes("设备")) {
      return responses["产品信息"];
    } else if (question.includes("技术") || question.includes("支持")) {
      return responses["技术支持"];
    } else if (question.includes("价格") || question.includes("报价")) {
      return responses["价格咨询"];
    } else if (question.includes("售后") || question.includes("服务")) {
      return responses["售后服务"];
    } else {
      return responses["默认"];
    }
  };

  // 发送消息处理
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // 获取AI回复
      const aiResponse = await getAIResponse(userMessage.content);
      
      // 添加AI消息
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      
      // 添加错误消息
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "抱歉，获取回复失败，请稍后再试。",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 键盘事件处理 (按Enter发送消息)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 初始AI欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        content: "您好！我是博视科技的AI咨询助手，很高兴为您服务。请问有什么可以帮助您的吗？",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-fadeIn">
        {/* 对话框头部 */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">AI咨询助手</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="关闭对话框"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>
        
        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl",
                message.sender === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              )}>
                <p>{message.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.sender === 'user' ? "text-blue-100" : "text-gray-500"
                )}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {/* 加载状态 */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[60%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* 用于自动滚动到底部的参考元素 */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* 输入区域 */}
        <div className="p-6 border-t">
          <div className="flex space-x-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入您的问题..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-full transition-colors ${
                input.trim() && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="发送消息"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-paper-plane"></i>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            输入问题后按Enter发送，Shift+Enter换行
          </p>
        </div>
      </div>
    </div>
  );
}