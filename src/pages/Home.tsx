import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeedbackDialog from '@/components/FeedbackDialog';

// Hero section data
const heroData = {
  title: "创新赢得尊重 · 科技引领未来",
  subtitle: "专注于非标定制自动化设备研发与制造的高新技术企业",
  ctaText: "了解我们的解决方案",
  ctaLink: "/products"
};

// Company advantages data
const advantages = [
  {
    icon: "lightbulb",
    title: "创新研发",
    description: 
      "拥有机械结构、电控、软件等多领域专业工程师组成的研发团队，持续技术创新"
  },
  {
    icon: "cogs",
    title: "定制服务",
    description: 
      "根据客户需求提供非标自动化解决方案，从设计到制造的一站式服务"
  },
  {
    icon: "industry",
    title: "生产实力",
    description: 
      "先进的生产设备和严格的质量控制体系，确保产品性能稳定可靠"
  },
  {
    icon: "globe-asia",
    title: "全球服务",
    description: 
      "多地办事处提供及时的技术支持和售后服务，快速响应客户需求"
  }
];

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "非标定制自动化设备",
    description: "根据客户特定需求定制的自动化生产设备，提高生产效率",
    imagePrompt: "Custom automation equipment in factory, high-tech industrial machine, clean background"
  },
  {
    id: 2,
    name: "自动化模组加工及组装",
    description: "精密自动化模组的加工与组装服务，确保组件质量与精度",
    imagePrompt: "Precision automation modules, close-up view of mechanical components, technical illustration"
  },
  {
    id: 3,
    name: "检测设备",
    description: "高精度检测设备，确保产品质量符合标准要求",
    imagePrompt: "Quality inspection equipment, high-tech measuring instruments, clean room environment"
  }
];

// Customer testimonials
const testimonials = [
  {
    quote: "博视科技的自动化解决方案帮助我们将生产效率提升了40%，产品质量也得到显著改善。",
    author: "某电子制造企业 生产总监",
    company: "行业领先企业"
  },
  {
    quote: "作为长期合作伙伴，博视科技的技术实力和服务态度给我们留下了深刻印象，是值得信赖的自动化设备供应商。",
    author: "某汽车零部件企业 采购经理",
    company: "上市公司"
  }
];

export default function Home() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    advantages: false,
    products: false,
    testimonials: false
  });

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Check visibility of sections based on scroll position
      if (scrollPosition > 300) setIsVisible(prev => ({ ...prev, advantages: true }));  
      if (scrollPosition > 800) setIsVisible(prev => ({ ...prev, products: true }));
      if (scrollPosition > 1400) setIsVisible(prev => ({ ...prev, testimonials: true }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 rounded-l-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-800/5 rounded-r-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                 <h1 className="font-bold leading-tight">
                    <span className="block text-2xl md:text-3xl mb-2">深圳市博视科技有限公司</span>
                     <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                     {heroData.title}
                   </span>
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 max-w-lg"
              >
                {heroData.subtitle}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration:.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                 <Link
                   to={heroData.ctaLink}
                   className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium text-center hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                 >
                   {heroData.ctaText}
                   <i className="fa-solid fa-arrow-right ml-2"></i>
                 </Link>
                 <button
                   onClick={() => window.dispatchEvent(new Event('openChat'))}
                   className="px-8 py-3 rounded-full border border-blue-600 text-blue-600 font-medium text-center hover:bg-blue-50 transition-all"
                 >
                   联系我们
                 </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center space-x-6 pt-6"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/client${i}/100/100`} 
                        alt="Client logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">500+</span> 企业的信赖之选
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
               <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-overlay"></div>
                  <img 
                    src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/微信圖片_〉〇〉「-〇』-〇」_〈〇「』「「_『」【_20250807094126.png" 
                    alt="博视科技大厅" 
                    className="w-full h-auto object-cover"
                  />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <i className="fa-solid fa-trophy text-xl"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium">国家高新技术企业</div>
                    <div className="text-xs text-gray-500">资质认证 · 技术保障</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.advantages ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                {(() => {
                  const imagePrompt = encodeURIComponent("Company team photo in modern office, diverse professionals collaborating, high-tech company environment");
                   return (
                    <img 
                      src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/未命名 -1_20250801180036.jpg" 
                      alt="博视科技团队" 
                      className="w-full h-auto"
                    />
                  );
                })()}
              </div>
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-70 z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20 z-0"></div>
            </motion.div>
            
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                关于博视科技
              </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
                 <i className="fa-solid fa-building text-blue-600 mr-3"></i>
                 专注自动化领域<br />
                 <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                   提供专业解决方案
                 </span>
               </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                深圳市博视科技有限公司成立于2012年，总部位于广东省深圳市，是一家专注于非标定制自动化设备、自动化模组加工及组装、精密金属件、夹治具加工与组装，金属小件尺寸检测设备研发与生产的高新技术企业。
              </p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                公司研发实力雄厚，拥有机械结构工程师、电控工程师、软件工程师等各类优秀人才组成的专业团队，并在广东、河南、山西、湖南、江苏、四川、越南等地设立办事处，可以为客户提供及时的方案评估、售后维护等技术支持和工程服务。
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600 mb-1">12+</span>
                  <span className="text-gray-600">行业经验</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600 mb-1">500+</span>
                  <span className="text-gray-600">成功案例</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600 mb-1">100+</span>
                  <span className="text-gray-600">专业团队</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600 mb-1">8+</span>
                  <span className="text-gray-600">分支机构</span>
                </div>
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                了解更多公司信息
                <i className="fa-solid fa-long-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              核心优势
            </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
                 <i className="fa-solid fa-trophy text-blue-600 mr-3"></i>
                 为什么选择<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">博视科技</span>
               </h2>
            <p className="text-gray-600">
              我们凭借专业的技术团队、先进的生产设备和完善的服务体系，为客户提供高质量的自动化解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible.advantages ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className={`fa-solid fa-${advantage.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-60">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                产品中心
              </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 flex items-center">
                 <i className="fa-solid fa-box text-blue-600 mr-3"></i>
                 精选产品与服务
               </h2>
              <p className="text-gray-600 max-w-2xl">
                我们提供各类自动化设备和解决方案，满足不同行业客户的定制需求
              </p>
            </div>
            
            <Link
              to="/products"
              className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all"
            >
              查看全部产品
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible.products ? "visible" : "hidden"} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-60">
                   {(() => {
                     const imageUrls = [
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/f1fe33911b6aa70e761b0665479deb09_20250807135518.jpg",
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/d9aa07d278fed70fee86afae2da4f2ba_20250807135525.jpg",
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/300151ce25368165bce468164eedae75_20250807135540.jpg"
                     ];
                     return (
                       <div className="absolute inset-0 flex items-center justify-center p-4">
                         <div className="w-full h-full border-8 border-white shadow-xl bg-gray-100 flex items-center justify-center p-1">
                           <img 
                             src={imageUrls[index]} 
                             alt={product.name} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                         </div>
                       </div>
                     );
                   })()}
                   <div className="absolute inset-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-white font-medium inline-flex items-center"
                      >
                        查看详情
                        <i className="fa-solid fa-arrow-right ml-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              客户评价
            </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
                 <i className="fa-solid fa-quote-right text-blue-600 mr-3"></i>
                 客户对我们的评价
               </h2>
            <p className="text-gray-600">
              来自各行业客户的真实反馈，见证我们的产品质量和服务水平
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible.testimonials ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg relative"
              >
                <div className="text-5xl text-blue-100 absolute top-6 left-6 opacity-50">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
                <blockquote className="relative z-10">
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <footer>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
               <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center">
                 <i className="fa-solid fa-rocket text-white mr-3"></i>
                 准备好提升您的生产效率了吗？
               </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              联系我们，获取专业的自动化解决方案咨询，让博视科技成为您企业发展的得力助手
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">  
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-white text-blue-600 font-medium text-center hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                立即咨询
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
               <button
                 onClick={() => setIsFeedbackOpen(true)}
                 className="px-8 py-4 rounded-full border border-white text-white font-medium text-center hover:bg-white/10 transition-all"
               >
                 在线留言
               </button>
            </div>
          </div>
        </div>
      </section>
       <FeedbackDialog
         isOpen={isFeedbackOpen}
         onClose={() => setIsFeedbackOpen(false)}
       />
     </div>
   );
 }