import { useState, useEffect } from 'react';
 import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';
 import FeedbackDialog from '@/components/FeedbackDialog';

// Company overview data
const companyOverview = {
  title: "关于博视科技",
  subtitle: "创新赢得尊重 · 科技引领未来",
  established: "2012年",
  location: "广东省深圳市",
  description: [
    "深圳市博视科技有限公司成立于2012年，总部位于广东省深圳市，是一家专注于非标定制自动化设备、自动化模组加工及组装、精密金属件、夹治具加工与组装，金属小件尺寸检测设备研发与生产的高新技术企业。",
    "公司研发实力雄厚，拥有机械结构工程师、电控工程师、软件工程师等各类优秀人才组成的专业团队，并在广东、河南、山西、湖南、江苏、四川、越南等地设立办事处，可以为客户提供及时的方案评估、售后维护等技术支持和工程服务。"
  ],
  coreValues: [
    { name: "创新", description: "持续技术创新，引领行业发展" },
    { name: "品质", description: "严格质量控制，确保产品性能" },
    { name: "服务", description: "专业贴心服务，超越客户期望" },
    { name: "合作", description: "互利共赢合作，共创美好未来" }
  ],
  achievements: [
    { value: "12+", label: "行业经验" },
    { value: "500+", label: "成功案例" },
    { value: "100+", label: "专业团队" },
    { value: "8+", label: "分支机构" }
  ]
};

// Main products data
const mainProducts = [
  {
    id: 1,
    name: "非标定制自动化设备",
    description: "根据客户特定需求定制的自动化生产设备，提高生产效率和产品质量",
    features: ["量身定制", "高效稳定", "智能控制", "易于维护"],
    imagePrompt: "Custom automation equipment in factory, high-tech industrial machine, clean background"
  },
  {
    id: 2,
    name: "自动化模组加工及组装",
    description: "精密自动化模组的加工与组装服务，确保组件质量与精度",
    features: ["精密加工", "模块化设计", "严格检测", "快速交付"],
    imagePrompt: "Precision automation modules, close-up view of mechanical components, technical illustration"
  },
  {
    id: 3,
    name: "检测设备",
    description: "高精度检测设备，确保产品质量符合标准要求",
    features: ["高精度检测", "自动化操作", "数据记录", "多行业适用"],
    imagePrompt: "Quality inspection equipment, high-tech measuring instruments, clean room environment"
  },
  {
    id: 4,
    name: "精密金属件加工",
    description: "提供各类精密金属零部件的加工服务，满足高精度要求",
    features: ["高精度加工", "多种材料", "复杂工艺", "严格检验"],
    imagePrompt: "Precision metal parts manufacturing, CNC machining, high-quality metal components"
  }
];

export default function About() {
   const [visibleSections, setVisibleSections] = useState({
     overview: false,
     products: false,
     culture: false
   });
   const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
 

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update visibility based on scroll position
      if (scrollPosition > 100) setVisibleSections(prev => ({ ...prev, overview: true }));
      if (scrollPosition > 600) setVisibleSections(prev => ({ ...prev, products: true }));
      if (scrollPosition > 1200) setVisibleSections(prev => ({ ...prev, culture: true }));
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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 rounded-l-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              关于我们
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {companyOverview.title}
            </h1>
            <p className="text-xl text-gray-600">
              {companyOverview.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.overview ? "visible" : "hidden"}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  公司概况
                </span>
              </h2>
              
              <div className="prose prose-lg text-gray-600 max-w-none mb-8">
                {companyOverview.description.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {companyOverview.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.value}</div>
                    <div className="text-gray-600">{achievement.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  联系我们
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                >
                  查看产品
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.overview ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/未命名 -1_20250801180036.jpg" 
                  alt="博视科技办公环境" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-70 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Products */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              主营产品
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              我们的<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">核心产品</span>
            </h2>
            <p className="text-gray-600">
              博视科技专注于提供高质量的自动化设备和解决方案，满足不同行业客户的需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                initial="hidden"
                animate={visibleSections.products ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                 <div className="h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-6 border-8 border-white shadow-xl">
                   {(() => {
                     const imageUrls = [
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/81ec193cb1a0ee1a80392250e7efa2d0_20250807140351.jpg",
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/d9aa07d278fed70fee86afae2da4f2ba_20250807140359.jpg",
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/b858e50d6548aaf458ba72ca247437e7_20250807140409.jpg",
                       "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/07c02384a7612a765351955ffd4013be_20250807140455.jpg"
                     ];
                     return (
                       <img 
                         src={imageUrls[index]} 
                         alt={product.name} 
                         className="w-full h-full object-contain p-1"
                       />
                     );
                   })()}
                 </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <i className="fa-solid fa-check text-blue-600 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              查看全部产品
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              企业文化
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              核心<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">价值观</span>
            </h2>
            <p className="text-gray-600">
              我们的价值观指导着公司的发展方向和员工的行为准则
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyOverview.coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={visibleSections.culture ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-6">
                  <i className={`fa-solid fa-${['lightbulb', 'check-circle', 'handshake', 'users'][index]}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.name}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好与我们合作了吗？
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              无论您需要标准产品还是定制解决方案，我们都能满足您的需求，欢迎联系我们
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                立即联系
                <i className="fa-solid fa-arrow-right ml-2"></i>
               </Link>
               <button
                 onClick={() => setIsFeedbackOpen(true)}
                 className="px-8 py-4 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
               >
                 在线咨询
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