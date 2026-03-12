import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeedbackDialog from '@/components/FeedbackDialog';

// Product categories
const productCategories = [
  { id: 1, name: "非标定制自动化设备", active: true },
  { id: 2, name: "自动化模组加工及组装", active: false },
  { id: 3, name: "检测设备", active: false },
  { id:.4, name: "精密金属件加工", active: false }
];

// Product data
const products = [
  {
    id: 1,
    name: "全自动装配生产线",
    categoryId: 1,
    description: "针对电子产品的全自动装配生产线，可完成零件上料、组装、检测、包装等一系列工序，自动化程度高，生产效率显著提升。",
    features: [
      "自动化程度高，减少人工干预",
      "高精度定位系统，确保装配质量",
      "模块化设计，易于维护和升级",
      "智能控制系统，可实现远程监控"
    ],
    application: "电子、汽车零部件、医疗器械等行业的产品装配",
    imagePrompt: "Automatic assembly production line, factory automation equipment, high-tech manufacturing"
  },
  {
    id: 2,
    name: "机器人焊接工作站",
    categoryId: 1,
    description: "集成工业机器人的焊接工作站，可完成复杂工件的高精度焊接作业，保证焊接质量稳定，提高生产效率。",
    features: [
      "高精度焊接机器人，确保焊接质量",
      "多工位设计，提高设备利用率",
      "智能焊接参数调节，适应不同工件",
      "完善的安全防护系统"
    ],
    application: "汽车制造、工程机械、金属加工等行业的焊接作业",
    imagePrompt: "Robotic welding workstation, industrial robot arm welding metal parts, factory environment"
  },
  {
    id: 3,
    name: "精密线性模组",
    categoryId: 2,
    description: "高精度线性模组，采用优质材料和精密加工工艺制造，具有运行平稳、定位精准等特点，可广泛应用于各类自动化设备。",
    features: [
      "高精度滚珠丝杠传动，定位精度高",
      "高强度铝合金型材，结构稳定",
      "多种驱动方式可选",
      "可根据需求定制行程和负载"
    ],
    application: "自动化设备、精密仪器、电子制造等领域的直线运动系统",
    imagePrompt: "Precision linear module, mechanical components, close-up view of linear actuator"
  },
  {
    id: 4,
    name: "视觉检测设备",
    categoryId: 3,
    description: "基于机器视觉技术的高精度检测设备，可对产品外观、尺寸、缺陷等进行快速准确检测，替代人工检测，提高检测效率和准确性。",
    features: [
      "高分辨率工业相机，图像采集清晰",
      "先进的图像处理算法，检测精度高",
      "自动化上下料系统，实现无人化检测",
      "完善的数据分析和报表功能"
    ],
    application: "电子、半导体、精密制造等行业的产品质量检测",
    imagePrompt: "Machine vision inspection system, industrial camera checking product quality, high-tech equipment"
  },
  {
    id: 5,
    name: "激光测量仪",
    categoryId: 3,
    description: "采用激光技术的高精度测量仪器，可对各类工件的尺寸、形状、位置等参数进行非接触式测量，测量精度高，速度快。",
    features: [
      "非接触式测量，避免对工件造成损伤",
      "高精度激光传感器，测量精度可达微米级",
      "自动化测量流程，提高检测效率",
      "数据自动分析和存储功能"
    ],
    application: "精密制造、模具加工、汽车零部件等行业的精密测量",
    imagePrompt: "Laser measuring instrument, high-precision measurement equipment, technical illustration"
  },
  {
    id: 6,
    name: "精密五金冲压件",
    categoryId: 4,
    description: "采用高精度冲压设备和优质材料制造的精密五金件，具有尺寸精度高、表面质量好等特点，可满足各类精密设备的装配需求。",
    features: [
      "高精度冲压模具，确保产品尺寸一致性",
      "优质原材料，保证产品强度和耐用性",
      "严格的质量控制，确保产品质量",
      "可根据客户图纸定制生产"
    ],
    application: "电子设备、精密仪器、汽车零部件等产品的结构件",
    imagePrompt: "Precision metal stamping parts, close-up view of mechanical components, high-quality metal parts"
  }
];

// Technical parameters for detailed product view
const technicalParameters = [
  { name: "电源电压", value: "AC 220V ±10%, 50Hz" },
  { name: "工作环境温度", value: "0-40℃" },
  { name: "工作环境湿度", value: "30-85% RH (无凝结)" },
  { name: "气源压力", value: "0.5-0.7MPa" },
  { name: "设备尺寸", value: "根据具体型号而定" },
  { name: "设备重量", value: "根据具体型号而定" }
];

export default function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [visibleSection, setVisibleSection] = useState(false);
  
  // Filter products by active category
  const filteredProducts = products.filter(
    (product) => product.categoryId === activeCategory
  );
  
  // Get current product details
  const currentProduct = selectedProduct 
    ? products.find(p => p.id === selectedProduct) 
    : filteredProducts[0];
  
  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      setVisibleSection(window.scrollY > 50);
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
      <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 rounded-l-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-index-10">
          <div className="max-w-3xl mx-auto text-center"><div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              产品中心
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              自动化<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">产品与解决方案</span>
            </h1>
            <p className="text-xl text-gray-600">
              我们提供各类自动化设备和解决方案，满足不同行业客户的定制需求
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
          >

            
            {/* Product details */}
            {currentProduct && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">{currentProduct.name}</h2>
                  <div className="prose prose-lg text-gray-600 max-w-none mb-8">
                    <p>{currentProduct.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">产品特点</h3>
                    <ul className="space-y-3">
                      {currentProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">应用领域</h3>
                    <p className="text-gray-600">{currentProduct.application}</p>
                  </div>
                  
                   <div className="flex flex-wrap gap-4">
                     <Link
                       to={`/products/${currentProduct.id}`}
                       className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                     >
                       查看详情
                       <i className="fa-solid fa-arrow-right ml-2"></i>
                     </Link>
                      <button 
                        className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                        onClick={() => setIsDialogOpen(true)}
                      >
                       索取资料
                     </button>
                   </div>
                </div>
                
                <div className="order-1 lg:order-2 relative">
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                    {(() => {
                      const imagePrompt = encodeURIComponent(currentProduct.imagePrompt);
                      return (
                         <img 
                          src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/b2b060004fad39c5e68948a3676c2e66_20250807141032.jpg" 
                         alt="工业机器人自动化生产线" 
                         className="w-full h-auto"
                        />
                      );
                    })()}
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-70 z-0"></div>
                </div>
              </div>
            )}
            
            {/* Product list */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">
                该类别下的其他产品
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredProducts.map((product, index) => (
                   <div
                     key={product.id}
                     onClick={() => setSelectedProduct(product.id)}
                     className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer ${
                       selectedProduct === product.id
                         ? "border-blue-600 shadow-lg shadow-blue-500/10"
                         : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                     }`}
                   >
                     <div className="h-48 mb-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-8 border-white shadow-xl">
                       {(() => {
                         // 为前两个产品使用指定图片，其他产品保持原逻辑
                         if (index === 0) {
                           return (
                             <img 
                               src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/284ffbd75a4946a14d1122128337ff8a_20250807141306.jpg" 
                               alt={product.name} 
                               className="w-full h-full object-contain p-1"
                             />
                           );
                         } else if (index === 1) {
                           return (
                             <img 
                               src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/1acef5b9d280393e81bf82503b44fcaa_20250807141320.jpg" 
                               alt={product.name} 
                               className="w-full h-full object-contain p-1"
                             />
                           );
                         }
                         const imagePrompt = encodeURIComponent(product.imagePrompt);
                         return (
                           <img 
                             src={`https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7BimagePrompt%7D&sign=664f4e0c6a2c586326cd3fc95372312f`} 
                             alt={product.name} 
                             className="w-full h-full object-contain p-4"
                           />
                         );
                       })()}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                     <Link to={`/products/${product.id}`} className="text-blue-600 font-medium flex items-center">
                       查看详情
                       <i className="fa-solid fa-arrow-right ml-2"></i>
                     </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical parameters section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                技术参数
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                标准技术参数
              </h2>
              <p className="text-gray-600">
                我们的产品采用先进技术制造，确保性能稳定可靠，以下为标准技术参数
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-8 py-6 text-left text-gray-700 font-semibold">参数名称</th>
                      <th className="px-8 py-6 text-left text-gray-700 font-semibold">参数值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalParameters.map((param, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-8 py-6 text-gray-900">{param.name}</td>
                        <td className="px-8 py-6 text-gray-600">{param.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-6 bg-gray-50 border-t">
                <p className="text-gray-600 text-sm">
                  注：以上为标准技术参数，具体产品参数可能因型号不同而有所差异，如有特殊需求，可联系我们进行定制。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom solution CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">需要定制专属解决方案？</h2>
                  <p className="text-blue-100 mb-8 text-lg">
                    我们拥有专业的研发团队，可根据您的特定需求，提供定制化的自动化解决方案
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                    >
                      咨询定制方案
                      <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                     <button
                       onClick={() => setIsDialogOpen(true)}
                       className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
                     >
                       在线留言
                     </button>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto">
                  {(() => {
                    const imagePrompt = encodeURIComponent("Engineers discussing custom automation solution, technical meeting, blueprints and digital tablet");
                    return (
                       <img 
                         src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/博视办公室照片_20250807140836.jpg" 
                        alt="定制解决方案" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
     </div>
     <FeedbackDialog
       isOpen={isDialogOpen}
       onClose={() => setIsDialogOpen(false)}
     />
      </section>
    </div>
  );
}